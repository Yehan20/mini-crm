
import { AxiosError, CanceledError } from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Pagination, Spinner, Button, ModalHeader, ModalBody, Modal, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from '../utils/axios';
import TableSkeleton from "./TableSkeleton";
import { Link } from "react-router";
import { HiX } from "react-icons/hi";
import type { Company, Status } from "../types/types";




export default function CompanyTable() {


    const [currentPage, setCurrentPage] = useState(1);


    const rows = [
        'Id', 'Name', 'Email', 'Website', 'Logo', 'Emlpoyees', 'Action'
    ]

    const [companies, setCompanies] = useState<Company[]>([])
    const [selectedCompanyId, setSelectedCompanyId] = useState<number>();
    const [status, setStatus] = useState<Status>('idle')
    const [pageLoaded, setPageLoaded] = useState(true);
    const [error, setError] = useState<null | string>(null)

    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showToast, setShowToast] = useState(false);



    const fetchCompanies = async (number = 1) => {

        const companies = await axios.get(`api/companies?page=${number}`);

        setCompanies(companies.data.data)
    }


    //Page changing 
    const onPageChange = async (page: number) => {
        setPageLoaded(false)
        setCurrentPage(page)
        try {
            await fetchCompanies(page);
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

        setOpenModal(true);
        setSelectedCompanyId(id);
    }

    // Delete company
    const deleteCompany = async (id: number) => {
        setLoading(true);
        try {

            await axios.delete('api/companies/' + id)

            const updatedCompanies = companies.filter((company) => company.id !== id);
            setCompanies(updatedCompanies)
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
        const controller = new AbortController();

        const fetchCompaniesPaginated = async () => {
            setStatus('pending')
            try {
                const companies = await axios.get(`api/companies?page=1`, { signal: controller.signal });

                setCompanies(companies.data.data)
                setStatus('success')

            } catch (error) {


                if (error instanceof CanceledError) {
                    return;
                }

                if (error instanceof AxiosError) {
                    console.log('error');
                    setError(error.response?.data.message)
                    setStatus('error')
                }
            }
        }

        fetchCompaniesPaginated();

        return () => {
            // abort fetch if quick navigation
            setTimeout(() => {

                console.log('clean up');
                controller.abort();
            }, 0)

        }
    }, [])


    return (
        <div className="pr-6 pt-6 w-full max-w-6xl mx-auto flex flex-col gap-6">
            {/* Toast */}
            {showToast && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Company deleted.</div>
                    {/* <ToastToggle /> */}
                </Toast>
            )}

            {/* Spinner */}
            {status === "pending" && (
                <div className="flex items-center justify-center min-h-[50vh]">
                    <Spinner size="xl" />
                </div>
            )}

            {/* Table */}
            {status === "success" && (
                <div className="overflow-x-auto  rounded-lg ">
                    <Table className="w-full">
                        <TableHead>
                            <TableRow>
                                {rows.map((row) => (
                                    <TableHeadCell key={row} className="text-gray-700">
                                        {row}
                                    </TableHeadCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pageLoaded &&
                                companies.map((company) => (
                                    <TableRow key={company.id} className="bg-white">
                                        <TableCell className="whitespace-nowrap font-medium text-gray-900">
                                            {company.id}
                                        </TableCell>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.email}</TableCell>
                                        <TableCell>{company.website}</TableCell>
                                        <TableCell>
                                            <img src={company.logo} alt={company.name} className="h-10 w-10 object-cover rounded" />
                                        </TableCell>
                                        <TableCell>{company.employees_count}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link
                                                to={`/companies/${company.id}/edit`}
                                                className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-sm"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                to={`/companies/${company.id}/details`}
                                                className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition text-sm"
                                            >
                                                View
                                            </Link>
                                            <Button
                                                size="sm"
                                                color="red"
                                                onClick={() => showDeleteModel(company.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            {!pageLoaded && <TableSkeleton />}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-center">
                        <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
                    </div>
                </div>
            )}

            {status === "error" && <p className="text-red-500 text-center">{error}</p>}

            {/* Delete Modal */}
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                            Are you sure you want to delete this company all employees in this company will be deleted?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                disabled={loading}
                                color="red"
                                onClick={() => deleteCompany(selectedCompanyId as number)}
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
