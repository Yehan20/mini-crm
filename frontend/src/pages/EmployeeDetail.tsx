import { useParams } from 'react-router';
import EmployeeCard from '../components/EmployeeCard';

const EmployeeDetail = () => {
    const id = useParams().id as string;
    return (
        <>
            <h1 className="text-2xl md:text-3xl font-bold  text-gray-800 mb-6">
                Employee Information
            </h1>
            <EmployeeCard id={id} />
        </>
    )
}

export default EmployeeDetail