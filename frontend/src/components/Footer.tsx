
const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-gray-100 py-2 text-center border-t border-gray-200 ">
      <p className="text-sm text-gray-600 ">
        © {new Date().getFullYear()} Admin CRM. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer