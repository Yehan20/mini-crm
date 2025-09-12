import React from 'react'
import CompanyForm from '../components/CompanyForm'

const CompanyCreate = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold  text-gray-800 mb-6">
        Create company
      </h1>
      <CompanyForm mode='create' />
    </div>
  )
}

export default CompanyCreate