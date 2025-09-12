import React from 'react'
import CompanyForm from '../components/CompanyForm'

const CompanyEdit = () => {
  return (
    <div className='w-3xl;'>
      <h1 className="text-2xl md:text-3xl font-bold  text-gray-800 mb-6">
        Edit Company
      </h1>
      <CompanyForm mode='update' />
    </div>
  )
}

export default CompanyEdit