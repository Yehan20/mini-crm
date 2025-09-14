
import { AxiosError } from "axios";
import { Alert, Button, FileInput, HelperText, Label, Spinner, TextInput, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, } from "react-router";
import axios from "../utils/axios";
import type { Company, ErrorBag, Status } from "../types/types";
import { HiCheck } from "react-icons/hi";
import { validate } from "../utils/helpers";
import { useAuth } from "../hooks/useAuth";
import BaseAlert from "./ui/BaseAlert";

export default function CompanyForm({ mode }: { readonly mode: 'Create' | 'Update' }) {

    const { logout } = useAuth()

    const [newCompany, setnewCompany] = useState<Company>({
        name: '',
        email: '',
        logo: null,
        website: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorBag | null>(null);

    const [status, setStatus] = useState<Status>('idle');
    const params = useParams();

    const navigate = useNavigate();

    const [toast, setToast] = useState({
        show: false,
        message: ''
    });



    // Add the input to the obect
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setnewCompany({ ...newCompany, [name]: value });
    }



    // create or update 
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setShowAlert(false);
        setErrors(null);

        //validate  
        const { errorBag, errorBagFilled } = validate(newCompany, {
            emailFormat: true,
            emptyFeilds: true,
        }, ['deleted_at','email','logo','website'


        ])


        if (errorBagFilled) {
            setErrors({ ...errorBag });
            return;
        }

        setErrors(null);
        setLoading(true);

        // Based on mode map the method and then redirect to companies
        try {
            console.log('company',newCompany);
            const companyFormData = new FormData();
            companyFormData.append('name', newCompany.name);
            companyFormData.append('email', newCompany.email??'');
            companyFormData.append('website', newCompany.website??'');

            if (newCompany.logo instanceof File) companyFormData.append('logo', newCompany.logo);

            if (mode === 'Update') {
                companyFormData.append('_method', 'put');
                await updateCompany(companyFormData);
            }
            else await createCompany(companyFormData);

            setTimeout(() => {
                navigate('/companies')
            }, 1000)

        } catch (e) {
            console.log(e);
            setLoading(false);
            if (e instanceof AxiosError) {

                // validation code
                if (e.status === 422) {
                    setErrors({ ...e.response?.data.errors })
                    return
                };

                // logged out
                if (e.status === 401) return  await logout();

                // Other errors mainly 500
                setShowAlert(true);
                setError(e.response?.data.message);

            }

        }
    }

    // Create Company
    const createCompany = async (formData: FormData) => {

        const company = await axios.post('api/companies', formData)

        if (company.data.data) {

            setToast({
                show: true,
                message: 'New company created'
            })
        }
    }

    // Update Company
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

                    // if logged out in another tab
                    if (e.status === 401) await logout();
                }

            }
        }
     
        if (mode === 'Update') {
            fetchCompany(params?.id as string);
        }
        if (mode === 'Create') {
            setStatus('success');
        }
    }, [mode, params.id, navigate, logout])




    // Pending
    if (status === 'pending') {

        return <div className="flex justify-center items-center h-[50vh]">
            <Spinner size="xl" />
        </div>
    }

    // failure
    if (status === 'error') {
        return (
            <div className="h-[50vh] flex items-center justify-center">
                 <BaseAlert color="failure" message={error ?? 'error'} />
            </div>
        )
    }

    return (
        <div className="flex max-w-md flex-col gap-4">

            {/* Toast message for creation and Update of company*/}
            {toast.show && (<Toast className="mt-4">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{toast.message}</div>
             
            </Toast>)}

            {status === "success" && (
                <form
                    onSubmit={handleSave}
                    className="w-full md:w-3xl   p-6 bg-gray-50 rounded-lg  transition flex flex-col gap-4"
                >
                    {/* Name */}
                    <div>
                        <Label htmlFor="name" className="mb-2 block">
                            Company name*
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
                            Company email (optional)
                        </Label>
                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            value={newCompany.email??''}
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
                            Website (optional)
                        </Label>
                        <TextInput
                            id="website"
                            type="text"
                            name="website"
                            value={newCompany.website??''}
                            color={errors?.website?.length ? "failure" : "gray"}
                            placeholder="https://www.company.com"
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
                            Logo (optional) (max 512 kb) (min : 100x100)
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
                    <div>
                        <Button disabled={loading} type="submit" className="mt-2 cursor-pointer">
                            {loading ? "Please wait ..." : `${mode} Company`}
                        </Button>
                    </div>

                </form>
            )}



            {showAlert && (
                <Alert color="failure" className="mt-4">
                    <span className="font-medium">{error}</span>
                </Alert>
            )}
        </div>
    );

}
