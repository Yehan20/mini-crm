
import EmployeeForm from '../components/EmployeeForm'

const EmployeeEdit = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold  text-gray-800 mb-6">
        Employee Edit
      </h1>
      <EmployeeForm mode='Update' />
    </div>
  )
}

export default EmployeeEdit