
import { AxiosError } from "axios";
import { Alert, Button, HelperText, Label, Select, Spinner, TextInput, Toast, ToastToggle } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, } from "react-router";
import axios from "../utils/axios";
import type { CompanyDropDown, Employee, ErrorBag, Status } from "../types/types";
import { HiCheck } from "react-icons/hi";
import { validate } from "../utils/helpers";
import { useAuth } from "../hooks/useAuth";
import BaseAlert from "./ui/BaseAlert";

export default function EmployeeForm({ mode }: { readonly mode: 'Create' | 'Update' }) {

    const { logout } = useAuth();

    const [newEmployee, setnewEmployee] = useState<Employee>({

        first_name: '',
        last_name: '',
        email: '',
        company_id: '',
        phone: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorBag | null>(null)
    const [companyDropDown, setCompanyDropDown] = useState<CompanyDropDown[]>([])
    const [status, setStatus] = useState<Status>('idle');


    const [toast, setToast] = useState({
        show: false,
        message: ''
    });

    const params = useParams();

    const navigate = useNavigate();

    // Set Employee with the different  values from the input 
    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setnewEmployee({ ...newEmployee, [name]: value });
    }


    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setShowAlert(false);
        setErrors(null);

        // Custom front end validator 
        const { errorBag, errorBagFilled } = validate(newEmployee, {
            emailFormat: true,
            emptyFeilds: true,
        }, [
            'deleted_at'
        ]);

        if (errorBagFilled) {
            setErrors({ ...errorBag });
            return;
        }

        setErrors(null);
        setLoading(true);

        try {

            if (mode === 'Update') await updateEmployee(newEmployee);
            else await createEmployee(newEmployee);

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

    // Create employeer and show toast
    const createEmployee = async (data: Employee) => {

        const employee = await axios.post('api/employees', data)

        if (employee.data.data) {

            setToast({
                show: true,
                message: 'Employee created'
            })
        }
    }

    // Edit employee and show toast
    const updateEmployee = async (data: Employee) => {

        const employee = await axios.put(`api/employees/${params.id}`, data)

        if (employee.data.data) {

            setToast({
                show: true,
                message: 'Employee Updated'
            })
        }
    }

    useEffect(() => {
        const fetchDropDown = async () => {
            try {
                const employee = await axios.get(`api/companies?dropdown=true`)
                setCompanyDropDown(employee.data.data)

            } catch (e) {
                if (e instanceof AxiosError) {
                    console.log(e);
                    //  runs in both creat and update employee
                    if (e.status === 401 && mode === 'Create') await logout()
                }
            }
        }
        fetchDropDown();

    }, [logout,mode]);

    //Runs if the mode is only edit
    useEffect(() => {

        const fetchEmployee = async (id: string) => {
            setStatus('pending')
            try {
                const employee = await axios.get(`api/employees/${id}`)
                setnewEmployee(employee.data.data)
                setStatus('success')
            } catch (e) {
                if (e instanceof AxiosError) {
                    console.log(e);
                    setError(e.response?.data.message)
                    setStatus('error')

                    //logged out in a another tab logout the user
                    if (e.status === 401) await logout();

                }

            }
        }

        if (mode === 'Update') {
            fetchEmployee(params?.id as string);
        }

        if (mode === 'Create') {
            setStatus('success')
        }

    }, [mode, params.id, logout])




    if (status === 'pending') {
        return <div className="flex items-center justify-center h-[50vh]">
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

            {/* Toast message for creation and update of employee*/}
            {toast.show && (<Toast className="mt-5 w-[500px]" >
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{toast.message}</div>
                <ToastToggle />
            </Toast>)}




            {status === 'success' && (<form onSubmit={handleSave} className="flex w-full md:w-3xl  p-6  flex-col gap-4 bg-gray-50 rounded-lg">
                {/* First Name */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="first_name" >
                            First name*
                        </Label>
                    </div>
                    <TextInput id="first_name" type="text" name="first_name" value={newEmployee.first_name}
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
                            Last name*
                        </Label>
                    </div>
                    <TextInput id="last_name" type="text" name="last_name" value={newEmployee.last_name}
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
                        <Label htmlFor="email">Email*</Label>
                    </div>
                    <TextInput id="email" type="text" name="email" value={newEmployee.email}
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

                {/* Phone */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" color="gray">
                            Phone*
                        </Label>
                    </div>

                    <TextInput id="phone" type="phone" name="phone" value={newEmployee.phone}
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
                    <Select id="company_id" name="company_id" value={newEmployee.company_id} onChange={(e) => handleInput(e)}>
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
                    <Button disabled={loading} className="cursor-pointer" type="submit">
                        {loading ? 'Please wait ...' : `${mode} Employee `}
                    </Button>
                </div>
            </form>)}

            {/*error when creation or update */}
            {showAlert && <Alert color="failure">
                <span className="font-medium">{error}</span>
            </Alert>}

        </div>
    );
}
