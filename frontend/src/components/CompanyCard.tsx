import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import axios from '../utils/axios';

import { Card, Spinner, Table, TableRow, TableHead, TableHeadCell, TableBody, TableCell } from "flowbite-react";
import type { Company, Status } from "../types/types";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import BaseAlert from "./ui/BaseAlert";


export default function CompanyCard({ id }: { readonly id: string }) {

    const { logout } = useAuth();

    const [company, setCompany] = useState<Company | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);

    // Fethc company
    useEffect(() => {
        const fetchCompany = async (id: string) => {
            setStatus("pending");
            try {
                const res = await axios.get(`api/companies/${id}`);
                setCompany(res.data.data);
                setStatus("success");
            } catch (e) {
                if (e instanceof AxiosError) {
                    setStatus("error");
                    setError(e.response?.data.message ?? "Failed to fetch company");
                    if (e.status === 401) await logout();
                } else {
                    setError("Something went wrong");
                }

            }
        };

        fetchCompany(id);
    }, [id, logout]);

    if (status === "pending") {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Spinner size="xl" />
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="h-[50vh] flex items-center justify-center">
                <BaseAlert color="failure" message={error ?? 'error'} />
            </div>
        );
    }


    if (!company) return null;

    return (
        <div className="space-y-6 py-6 pr-6">
            {/* Company Info */}
            <Card>
                <div className="md:flex items-center space-x-4">
                    {
                 
                        <img
                            src={company.logo as string  ?? 'https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png'}
                            alt={company.name}
                            className="h-20 w-20 object-cover rounded-full"
                        />
                    }


                    <div>
                        <h2 className="text-2xl font-bold">Name : {company.name}</h2>
                        <p className="text-gray-600 mb-1">Email : {company.email ?? 'NA'}</p>
                        <p className="text-blue-600 mb-1">
                            Website :
                             { company.website ? <a className="hover:opacity-60" href={`${company.website}`} target="_blank">
                                 {company.website}
                            </a>
                             : ' NA'}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Employees Table */}
            <Card className="overflow-x-auto ">
                <h3 className="text-xl font-semibold mb-4">Employees</h3>
                <Table hoverable className="w-full ">
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Id</TableHeadCell>
                            <TableHeadCell>First Name</TableHeadCell>
                            <TableHeadCell>Last Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Phone</TableHeadCell>
                        </TableRow>

                    </TableHead>
                    <TableBody >
                        {company.employees && company.employees.length > 0 ? (
                            company.employees.map((emp) => (
                                <TableRow key={emp.id} className="bg-white">
                                    <TableCell>
                                        <Link to={`/employees/${emp.id}/details`}
                                            className="text-blue-500 hover:text-gray-700">
                                            {emp.id}
                                        </Link></TableCell>
                                    <TableCell>{emp.first_name}</TableCell>
                                    <TableCell>{emp.first_name}</TableCell>
                                    <TableCell>{emp.last_name}</TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                    <TableCell>{emp.phone}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No employees found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
