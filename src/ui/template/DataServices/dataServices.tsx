'use client'
import MainComponent from "@/ui/organisms/main/main";
import styled from "styled-components";

interface IDataService {
    pagination: Pageable
    data: IServicesResponse
}

const StyledContent = styled.div`
   display: flex;
   justify-content: baseline;
   align-items: center;
   width: 80%;
   height: 80vh;
   margin: 30px;
`;
export default function DataService({ data, pagination }: IDataService) {

    const handleEdit = () => {
        // Implement your edit logic here
    }

    const handleDelete = () => {
        // Implement your delete logic here
    }
    return (
        <StyledContent>
            <MainComponent data={data} onEdit={handleEdit} onDelete={handleDelete} pagination={pagination} />
        </StyledContent>
    )
}