'use client'
import MainComponent from "@/ui/organisms/main/main";

interface IDataService{
    pagination: Pageable
    data: IServicesResponse
}

export default function DataService({data, pagination}: IDataService){

    const handleEdit = () => {
        // Implement your edit logic here
    }

    const handleDelete = () => {
        // Implement your delete logic here
    }
    return (
        <MainComponent data={data} onEdit={handleEdit} onDelete={handleDelete} pagination={pagination}/>
    )
}