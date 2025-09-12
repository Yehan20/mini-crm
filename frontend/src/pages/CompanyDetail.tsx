
import { useParams } from 'react-router'
import CompanyCard from '../components/CompanyCard';

const CompanyDetail = () => {
    const id = useParams().id as string;
    return (
        <>
            <h1 className="text-2xl md:text-3xl font-bold  text-gray-800 mb-6">
                Company Information
            </h1>
            <CompanyCard id={id} />
        </>
    )
}

export default CompanyDetail