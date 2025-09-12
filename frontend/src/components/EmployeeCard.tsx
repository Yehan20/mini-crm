import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import axios from "../utils/axios";
import { Card, Spinner, Alert } from "flowbite-react";
import { Link } from "react-router";
import type { Employee, Status } from "../types/types";




export default function EmployeeCard({ id }: {  readonly id: string }) {

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);


  // Get the employee
  useEffect(() => {

    const fetchEmployee = async (id: string) => {
      setStatus("pending");

      try {
        const res = await axios.get(`api/employees/${id}`);
        setEmployee(res.data.data);
        setStatus("success");
      } 
      catch (e) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.message ?? "Failed to fetch employee");
        } else {
          setError("Something went wrong");
        }
        setStatus("error");
      }
    };

    fetchEmployee(id);
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

  if (!employee) return null;

  return (
    <div className="space-y-6 pb-6 pr-6 max-w-3xl">

      {/* Employee Info */}
      <Card>
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xl font-bold">
            {employee.first_name[0]}{employee.last_name[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {employee.first_name} {employee.last_name}
            </h2>
            <p className="text-gray-600">{employee.email}</p>
            <p className="text-gray-600">{employee.phone}</p>
            <p className="text-blue-600 mt-1 font-medium">
              <Link to={`/companies/${employee.company?.id}/details`} title="Click to visit company">Company: {employee.company?.name}</Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
