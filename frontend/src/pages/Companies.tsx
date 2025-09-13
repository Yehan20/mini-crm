import CompanyTable from '../components/CompanyTable'
import { Link } from 'react-router'

const Companies = () => {
  return (
   
      <div>
        <div className='flex justify-between items-end-safe pr-5'>
          <h1 className="text-xl md:text-3xl font-bold  text-gray-800 mb-6">
            Companies
          </h1>

          <Link  title="Click to visit company" className='bg-blue-500 text-white rounded px-3 py-[6px] md:py-2 hover:opacity-60' to={'/companies/create'}>
            New Company
          </Link>
        </div>

        <CompanyTable />
      </div>

  

  )
}

export default Companies