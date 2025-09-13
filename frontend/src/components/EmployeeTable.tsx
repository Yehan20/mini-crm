
import { AxiosError, CanceledError } from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Pagination, Spinner, Button, Modal, ModalHeader, ModalBody, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from '../utils/axios';
import { Link } from "react-router";
import { HiX } from "react-icons/hi";
import TableSkeleton from "./TableSkeleton";
import type { Employee } from "../types/types";



type Status = 'pending' | 'success' | 'error' | 'idle';

export default function EmployeeTable() {


    const [currentPage, setCurrentPage] = useState(1);


    const rows = [
        'Id', 'First name', 'Last Name', 'Email', 'Phone', 'Company', 'Action'
    ]

    const [employees, setEmployees] = useState<Employee[]>([])
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<null | string>(null)
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>();


    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(true);
    const [totalPages, setTotalPages] = useState(1);


    const fetchEmployees = async (number = 1) => {

        const companies = await axios.get(`api/employees?page=${number}`);

        setEmployees(companies.data.data)
    }



    const onPageChange = async (page: number) => {
        setPageLoaded(false)
        setCurrentPage(page)
        try {
            await fetchEmployees(page);
        } catch (error) {

            if (error instanceof AxiosError) {
                setError(error.response?.data.message)
            }
            setStatus('error')
        } finally {
            setPageLoaded(true);
        }


    };


    // Show delete model
    const showDeleteModel = async (id: number) => {
        console.log('clicked');

        setOpenModal(true);
        setSelectedEmployeeId(id);
    }

    // Delete company
    const deleteEmployee = async (id: number) => {
        setLoading(true);
        try {

            await axios.delete('api/employees/' + id)

            const updatedEmployees = employees.filter((employee) => employee.id !== id);
            setEmployees(updatedEmployees)

            setOpenModal(false);
            setShowToast(true);
            setLoading(false);

            setTimeout(() => {
                setShowToast(false);
            }, 1000)

        } catch (error) {

            if (error instanceof AxiosError) {
                setError(error.response?.data.message)
            }
            setStatus('error')

        }
    }


    useEffect(() => {
        const controller = new AbortController(); // for canceling request

        const fetchEmployeesPaginated = async () => {
            setStatus('pending');
            try {
                const res = await axios.get('api/employees?page=1', { signal: controller.signal });
                setEmployees(res.data.data);
                setTotalPages(res.data.meta.last_page)
                setStatus('success');
            } catch (err) {

                if (err instanceof CanceledError) return; // request was canceled
                if (err instanceof AxiosError) {
                    setError(err.response?.data.message ?? 'Failed to fetch employees');
                } else {
                    setError('Something went wrong');
                }
                setStatus('error');
            }
        };

        fetchEmployeesPaginated();

        return () => {
            // abort fetch if component unmounts quickly
            setTimeout(() => controller.abort(), 0);
        };
    }, []);



    return (
        <div className="pr-6  py-6 w-full max-w-6xl mx-auto flex flex-col gap-6">

            {showToast && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Employee Deleted.</div>
                    {/* <ToastToggle /> */}
                </Toast>
            )}

            {/* Spinner */}
            {status === "pending" && (
                <div className="flex items-center justify-center min-h-[50vh] ">
                    <Spinner size="xl" />
                </div>
            )}

            {/* Table */}
            {status === "success" && (
                <div className="overflow-x-auto flex justify-center bg-gray-50  rounded-md shadow-md">
                    <Table className="w-full" striped>
                        <TableHead className="bg-white">
                            <TableRow>
                                {rows.map((row) => (
                                    <TableHeadCell key={row} className="text-gray-700">
                                        {row}
                                    </TableHeadCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pageLoaded && employees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                        {employee.id}
                                    </TableCell>
                                    <TableCell>{employee.first_name}</TableCell>
                                    <TableCell>{employee.last_name}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.phone}</TableCell>

                                    <TableCell><Link className="text-blue-700 font-semibold hover:text-gray-700" title="Visit company" to={`/companies/${employee.company_id}/details`}>{employee.company?.name}</Link></TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <Link
                                            to={`/employees/${employee.id}/edit`}
                                            className="px-3 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-sm"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            to={`/employees/${employee.id}/details`}
                                            className="px-3 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition text-sm"
                                        >
                                            View
                                        </Link>
                                        <Button
                                            size="sm"

                                            color="red"
                                            onClick={() => showDeleteModel(employee.id as number)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {pageLoaded && employees.length === 0 && (

                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-lg py-4 text-gray-500">
                                        No records found
                                    </TableCell>
                                </TableRow>
                            )}


                            {/* Skeleton loader */}
                            {!pageLoaded && <TableSkeleton />}
                        </TableBody>
                    </Table>


                </div>
            )}

            {status === "error" && <p className="text-red-500 text-center">{error}</p>}


            
            {/* Pagination */}
            <div className="mb-2 flex justify-center ">
                {status === "success" && <Pagination className="paginator" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />}
            </div>


            {/* Delete Employee Model */}
            <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                            Are you sure you want to delete this employee?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                disabled={loading}
                                color="red"
                                onClick={() => deleteEmployee(selectedEmployeeId as number)}
                            >
                                {loading ? "Deleting..." : "Yes"}
                            </Button>
                            <Button
                                color="gray"
                                disabled={loading}
                                onClick={() => setOpenModal(false)}
                            >
                                No
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );

}
