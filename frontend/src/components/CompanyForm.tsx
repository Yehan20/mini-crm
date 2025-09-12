
import { AxiosError } from "axios";
import { Alert, Button, FileInput, HelperText, Label, Spinner, TextInput, Toast, ToastToggle } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, } from "react-router";
import axios from "../utils/axios";
import type { Company, Status } from "../types/types";
import { HiCheck } from "react-icons/hi";

export default function CompanyForm({ mode }: { mode: 'create' | 'update' }) {



    const [newCompany, setnewCompany] = useState<Company>({
        name: '',
        email: '',
        logo: null,
        website: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<errorBagProp | null>(null)

    const [status, setStatus] = useState<Status>('idle');
    const params = useParams();

    const navigate = useNavigate();

    const [toast, setToast] = useState({
        show: false,
        message: ''
    });

    type errorBagProp = {

        name: string[],
        email: string[],
        logo: string[],
        website: string[],
    };

    const errorBag: errorBagProp = {
        name: [],
        email: [],
        logo: [],
        website: [],
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setnewCompany({ ...newCompany, [name]: value });
    }


    // check if error bag is filled by defualt
    const isBagFilled = (obj: errorBagProp) => {
        return Object.values(obj).some(arr => arr.length > 0);
    }


    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setShowAlert(false);
        setErrors(null);

    

        // Front end check
        for (const prop in newCompany) {

            const _prop = prop as 'name' | 'email'

            // empty
            if (newCompany[_prop] === '' || newCompany[_prop] === null) {

                console.log('true');
                errorBag[_prop]?.push(`${prop} required`)

            }

            if (prop === 'email') {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!regex.test(newCompany.email)) {
                    errorBag['email']?.push(`invalid email format`)
                }
            }

        }

        if (isBagFilled(errorBag)) {
            setErrors({ ...errorBag });
            return;
        }

        setErrors(null);
        setLoading(true);


        try {
            const companyFormData = new FormData();
            companyFormData.append('name', newCompany.name);
            companyFormData.append('email', newCompany.email);
            companyFormData.append('website', newCompany.website);

            if (newCompany.logo instanceof File) companyFormData.append('logo', newCompany.logo);

            if (mode === 'update') {
                companyFormData.append('_method', 'put');
                await updateCompany(companyFormData);
            }
            else await createCompany(companyFormData);



            setTimeout(() => {
                navigate('/employees')
            }, 500)




        } catch (e) {
            console.log(e);
            setLoading(false);
            if (e instanceof AxiosError) {

                if (e.status === 422) setErrors({ ...e.response?.data.errors });
                else {
                    setShowAlert(true);
                    setError(e.response?.data.message);
                }
            }

        }
    }

    const createCompany = async (formData: FormData) => {


        const company = await axios.post('api/companies', formData)

        if (company.data.data) {

            setToast({
                show: true,
                message: 'New company created'
            })
        }
    }

    const updateCompany = async (formData: FormData) => {

        const company = await axios.post(`api/companies/${params.id}`, formData)

        if (company.data.data) {

            setToast({
                show: true,
                message: 'Company Updated'
            })
        }
    }

    // Select the files
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setnewCompany({ ...newCompany, logo: e.target.files[0] });
            console.log("Selected file:", e.target.files[0]);
        }
    };

    //Runsif the mode is only edit
    useEffect(() => {
        const fetchCompany = async (id: string) => {
            setStatus('pending')
            try {
                const company = await axios.get(`api/companies/${id}`)
                setnewCompany(company.data.data)
                setStatus('success')
            } catch (e) {
                if (e instanceof AxiosError) {
                    console.log(e);
                    setError(e.response?.data.message)
                    setStatus('error')
                }

            }
        }
        if (mode === 'update') {
            fetchCompany(params?.id as string);
        }
        if (mode === 'create') {
            setStatus('success');
        }
    }, [mode, params.id])


    if (status === 'pending') {

        return <div className="flex justify-center min-h-screen">
            <Spinner size="xl" />
        </div>
    }

    return (
        <div className="flex max-w-md flex-col gap-4">

            {/* Toast message for creation and update of employee*/}
            {toast.show && (<Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{toast.message} Navigating.. to Companies page</div>
                <ToastToggle />
            </Toast>)}

            {status === "success" && (
                <form
                    onSubmit={handleSave}
                    className="w-full md:w-3xl   p-6 bg-gray-50 rounded-lg  transition flex flex-col gap-4"
                >
                    {/* Name */}
                    <div>
                        <Label htmlFor="name" color="success" className="mb-2 block">
                            Company name
                        </Label>
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={newCompany.name}
                            color={errors?.name?.length ? "failure" : "gray"}
                            placeholder="Company Name"
                            onChange={handleInput}
                        />
                        <div className="mt-2">
                            {errors?.name?.map((err) => (
                                <HelperText className="text-red-500 my-0" key={err}>
                                    {err}
                                </HelperText>
                            ))}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" className="mb-2 block">
                            Company email
                        </Label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={newCompany.email}
                            color={errors?.email?.length ? "failure" : "gray"}
                            placeholder="name@company.com"
                            onChange={handleInput}
                        />
                        <div className="mt-2">
                            {errors?.email?.map((err) => (
                                <HelperText className="text-red-500 my-0" key={err}>
                                    {err}
                                </HelperText>
                            ))}
                        </div>
                    </div>

                    {/* Website */}
                    <div>
                        <Label htmlFor="website" className="mb-2 block">
                            Website
                        </Label>
                        <TextInput
                            id="website"
                            type="text"
                            name="website"
                            value={newCompany.website}
                            color={errors?.website?.length ? "failure" : "gray"}
                            placeholder="www.company.com"
                            onChange={handleInput}
                        />
                        <div className="mt-2">
                            {errors?.website?.map((err) => (
                                <HelperText className="text-red-500 my-0" key={err}>
                                    {err}
                                </HelperText>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="max-w-md">
                        <Label className="mb-2 block" htmlFor="logo">
                            Upload logo
                        </Label>
                        <FileInput id="logo" onChange={handleFile} />
                        <div className="mt-2">
                            {errors?.logo?.map((err) => (
                                <HelperText className="text-red-500 my-0" key={err}>
                                    {err}
                                </HelperText>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button disabled={loading} type="submit" className="mt-2">
                        {loading ? "Please wait ..." : `${mode} company`}
                    </Button>
                </form>
            )}

            {status === "error" && (
                <p className="text-center text-red-500 font-semibold mt-4">{error}</p>
            )}

            {showAlert && (
                <Alert color="failure" className="mt-4">
                    <span className="font-medium">{error}</span>
                </Alert>
            )}
        </div>
    );

}
