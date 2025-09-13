
import { Link } from 'react-router'
import EmployeeTable from '../components/EmployeeTable'

const Employees = () => {
  return (
    <div>
      <div className="flex justify-between items-center pr-5">
        <h1 className="text-xl md:text-3xl font-bold  text-gray-800 mb-6">
          Employees
        </h1>

         <Link title='Click to visit' className='bg-blue-500 text-white rounded px-3  py-[6px] md:py-2 hover:opacity-60' to={'/employees/create'}>
           New Employee
        </Link>
      </div>

      <EmployeeTable />
    </div>
  )
}

export default Employees