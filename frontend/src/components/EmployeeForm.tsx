
import { AxiosError } from "axios";
import { Alert, Button, HelperText, Label, Select, Spinner, TextInput, Toast, ToastToggle } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, } from "react-router";
import axios from "../utils/axios";
import type { CompanyDropDown, Employee, errorBagProp, Status } from "../types/types";
import { HiCheck } from "react-icons/hi";

export default function EmployeeForm({ mode }: { readonly mode: 'Create' | 'Update' }) {


    const [newEmployer, setnewEmployer] = useState<Employee>({

        first_name: '',
        last_name: '',
        email: '',
        company_id: '',
        phone: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<errorBagProp | null>(null)
    const [companyDropDown, setCompanyDropDown] = useState<CompanyDropDown[]>([])
    const [status, setStatus] = useState<Status>('idle');
    const [toast, setToast] = useState({
        show: false,
        message: ''
    });

    const params = useParams();

    const navigate = useNavigate();



    const errorBag: errorBagProp = {
        first_name: [],
        last_name: [],
        email: [],
        phone: [],
        company_id: []
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setnewEmployer({ ...newEmployer, [name]: value });
    }


    // check if error bag is filled by defualt
    const isBagFilled = (obj: errorBagProp) => {
        return Object.values(obj).some(arr => arr.length > 0);
    }


    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setShowAlert(false);
        setErrors(null);

        console.log(newEmployer);

        // Front end check
        for (const prop in newEmployer) {

            const _prop = prop as 'first_name' | 'email' | 'last_name' | 'phone'

            // empty
            if (newEmployer[_prop] === '' || newEmployer[_prop] === null) {

                errorBag[_prop]?.push(`${prop} required`)

            }

            if (prop === 'email') {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!regex.test(newEmployer.email)) {
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

            if (mode === 'Update') await updateEmployer(newEmployer);
            else await createEmployer(newEmployer);

            setTimeout(() => {
                navigate('/employees')
            }, 1000)



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

    const createEmployer = async (data: Employee) => {


        const employee = await axios.post('api/employees', data)

        if (employee.data.data) {

            setToast({
                show: true,
                message: 'Employee created'
            })


            console.log('made companny');

        }
    }

    const updateEmployer = async (data: Employee) => {

        const employee = await axios.put(`api/employees/${params.id}`, data)

        if (employee.data.data) {

            setToast({
                show: true,
                message: 'Employee Updated'
            })
        }
    }

    //Runs if the mode is only edit
    useEffect(() => {

        const fetchEmployer = async (id: string) => {
            setStatus('pending')
            try {
                const employee = await axios.get(`api/employees/${id}`)
                setnewEmployer(employee.data.data)
                setStatus('success')
            } catch (e) {
                if (e instanceof AxiosError) {
                    console.log(e);
                    setError(e.response?.data.message)
                    setStatus('error')
                }

            }
        }
        const fetchDropDown = async () => {

            try {
                const employee = await axios.get(`api/companies?dropdown=true`)
                setCompanyDropDown(employee.data.data)

            } catch (e) {
                if (e instanceof AxiosError) {
                    console.log(e);

                }

            }
        }

        fetchDropDown();

        if (mode === 'Update') {
            fetchEmployer(params?.id as string);
        }

        if (mode === 'Create') {
            setStatus('success')
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
                <div className="ml-3 text-sm font-normal">{toast.message} Navigating.. to Employees page</div>
                <ToastToggle />
            </Toast>)}




            {status === 'success' && (<form onSubmit={handleSave} className="flex min-w-2xl w-full  p-6  flex-col gap-4 bg-gray-50 rounded-lg">
                {/* First Name */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="first_name" >
                            Employee First Name*
                        </Label>
                    </div>
                    <TextInput id="first_name" type="text" name="first_name" value={newEmployer.first_name}
                        color={errors?.first_name?.length ? 'failure' : 'gray'}
                        placeholder="John" onChange={(e) => handleInput(e)} />

                    {/* Error messages */}
                    <div className="mt-2">
                        {errors?.first_name?.map((err) => (
                            <HelperText className="text-red-500 my-0" key={err}>
                                {err}
                            </HelperText>
                        ))}

                    </div>
                </div>

                {/*Last  Name */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" >
                            Employee Last Name*
                        </Label>
                    </div>
                    <TextInput id="last_name" type="text" name="last_name" value={newEmployer.last_name}
                        color={errors?.last_name?.length ? 'failure' : 'gray'}
                        placeholder="Doe"
                        onChange={(e) => handleInput(e)} />

                    {/* Error messages */}
                    <div className="mt-2">
                        {errors?.last_name?.map((err) => (
                            <HelperText className="text-red-500 my-0" key={err}>
                                {err}
                            </HelperText>
                        ))}

                    </div>
                </div>


                {/* Email */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email">Employee email*</Label>
                    </div>
                    <TextInput id="email" type="email" name="email" value={newEmployer.email}
                        color={errors?.email?.length ? 'failure' : 'gray'}
                        placeholder="name@test.com" onChange={(e) => handleInput(e)} />

                    {/* Error messages */}
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
                    <div className="mb-2 block">
                        <Label htmlFor="phone" color="gray">
                            Phone*
                        </Label>
                    </div>

                    <TextInput id="phone" type="phone" name="phone" value={newEmployer.phone}
                        color={errors?.phone?.length ? 'failure' : 'gray'}
                        placeholder="07xxxxxxx" onChange={(e) => handleInput(e)} />

                    {/* Error messages */}
                    <div className="mt-2">
                        {errors?.phone?.map((err) => (
                            <HelperText className="text-red-500 my-0" key={err}>
                                {err}
                            </HelperText>
                        ))}
                    </div>

                </div>


                {/* Company */}
                <div id="" className="max-w-md">

                    <div className="mb-2 block">
                        <Label htmlFor="company_id">Select Company*</Label>
                    </div>
                    <Select id="company_id" name="company_id" value={newEmployer.company_id} onChange={(e) => handleInput(e)}>
                        <option value='' disabled>Select</option>
                        {Array.isArray(companyDropDown) && companyDropDown.map((dropdown) => (
                            <option value={dropdown.id} key={dropdown.id}>
                                {dropdown.name}
                            </option>
                        ))}

                    </Select>

                    <div className="mt-2">
                        {errors?.company_id?.map((err) => (
                            <HelperText className="text-red-500 my-0" key={err}>
                                {err}
                            </HelperText>
                        ))}

                    </div>
                </div>

                <div>
                    <Button disabled={loading} type="submit">
                        {loading ? 'Pleasee wait ...' : `${mode} Employee `}
                    </Button>
                </div>
            </form>)}


            {status === 'error' && <p className="text-red-500 text-2xl">{error}</p>}


            {/* Show Aler */}
            {showAlert && <Alert color="failure">
                <span className="font-medium">{error}</span>
            </Alert>}

        </div>
    );
}
