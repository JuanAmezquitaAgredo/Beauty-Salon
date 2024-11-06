'use client'
import Modal from "@/ui/atoms/modal";
import MainComponent from "@/ui/organisms/main/main";
import RegisterForm from "@/ui/organisms/registerServices/RegisterForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

    const router = useRouter();
    const [ModalOpenEmp, setModalOpenEmp] = useState(false);

    const toggleModalEmp = () => {
        setModalOpenEmp(!ModalOpenEmp);
    }

    const handleAdd = () => {
        toggleModalEmp();
    }

    const handleEdit = () => {
        // Implement your edit logic here
    }

    const handleDelete = async (serviceId: number) => {
        try {
            const response = await fetch(`/api/services/delete/${serviceId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (!response.ok) {
                throw new Error("Error al eliminar el servicio");
            }
    
            alert("Servicio eliminado exitosamente");
            router.refresh();
            return await response.json();
            
        } catch (error) {
            console.error("Error en el DELETE:", error);
            throw error;
        }
    };

    return (
        <StyledContent>
            <MainComponent data={data} onEdit={handleEdit} onDelete={(serviceId) => handleDelete(serviceId)} pagination={pagination} NameButtonAdd="Agregar Servicio" handleAdd={handleAdd} />
            <Modal isOpen={ModalOpenEmp} onClose={toggleModalEmp} title="Agregar Servicio">
                    <RegisterForm onClose={toggleModalEmp}/>
            </Modal>
        </StyledContent>
    )
}