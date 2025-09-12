import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-gray-100 dark:bg-gray-900 py-4 text-center border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Admin CRM. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer