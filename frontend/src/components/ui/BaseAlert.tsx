import { Alert } from 'flowbite-react'


const BaseAlert = ({color,message}:{color:string,message:string}) => {
    return (
        <Alert  color={color} className="mt-4 flex justify-center text-center">
            <p className="font-medium">{message}</p>
        </Alert>
    )
}

export default BaseAlert