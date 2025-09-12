
import CompanyForm from '../components/CompanyForm'

const CompanyCreate = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold  text-gray-800 mb-6">
        Create company
      </h1>
      <CompanyForm mode='Create' />
    </div>
  )
}

export default CompanyCreate