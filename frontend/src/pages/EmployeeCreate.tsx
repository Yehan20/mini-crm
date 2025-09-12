import EmployeeForm from '../components/EmployeeForm'

const EmployeeCreate = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold  text-gray-800 mb-6">
        Employee Create
      </h1>
      <EmployeeForm mode='Create' />
    </div>

  )
}

export default EmployeeCreate