import { useEffect, useState } from "react";
import  { AxiosError } from "axios";
import axios from '../utils/axios';

import { Card, Spinner, Table, Alert, TableRow, TableHead, TableHeadCell, TableBody, TableCell } from "flowbite-react";

type Employee = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
};

type Company = {
    id?: number;
    name: string;
    email: string;
    logo: File | null | string;
    website: string;
    employees: Employee[];
};

type Status = "pending" | "success" | "error" | "idle";

export default function CompanyCard({ id }: { id: string }) {
    const [company, setCompany] = useState<Company | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompany = async (id: string) => {
            setStatus("pending");
            try {
                const res = await axios.get(`api/companies/${id}`);
                setCompany(res.data.data);
                setStatus("success");
            } catch (e) {
                if (e instanceof AxiosError) {
                    setError(e.response?.data.message ?? "Failed to fetch company");
                } else {
                    setError("Something went wrong");
                }
                setStatus("error");
            }
        };

        fetchCompany(id);
    }, [id]);

    if (status === "pending") {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="xl" />
            </div>
        );
    }

    if (status === "error") {
        return (
            <Alert color="failure">
                <span className="font-medium">Error:</span> {error}
            </Alert>
        );
    }

    if (!company) return null;

    return (
        <div className="space-y-6 pb-6 pr-6">
            {/* Company Info */}
            <Card>
                <div className="flex items-center space-x-4">
                    {typeof company.logo === "string" && (
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="h-20 w-20 object-cover rounded-full"
                        />
                    )}
                    <div>
                        <h2 className="text-2xl font-bold">{company.name}</h2>
                        <p className="text-gray-600">{company.email}</p>
                        <p className="text-blue-600">
                            <a href={`https://${company.website}`} target="_blank">
                                {company.website}
                            </a>
                        </p>
                    </div>
                </div>
            </Card>

            {/* Employees Table */}
            <Card>
                <h3 className="text-xl font-semibold mb-4">Employees</h3>
                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>First Name</TableHeadCell>
                            <TableHeadCell>Last Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Phone</TableHeadCell>
                        </TableRow>

                    </TableHead>
                    <TableBody >
                        {company.employees.length > 0 ? (
                            company.employees.map((emp) => (
                                <TableRow key={emp.id} className="bg-white">
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
