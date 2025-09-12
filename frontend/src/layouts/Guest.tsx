
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Spinner } from 'flowbite-react'



const Guest = () => {

    const {status} =useAuth()


    // Preven logged users from accesing login route
    if (status === 'idle') {

        return <div className="flex items-center justify-center min-h-screen">
            <Spinner size="xl" />
        </div>
    }

    if (status === 'authenticated') {

        return <Navigate to={'/'} />
    }

    return (
        <div className='h-screen md:flex justify-center md:items-center bg-white'>
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default Guest