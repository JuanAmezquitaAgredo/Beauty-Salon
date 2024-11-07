'use client'
import Modal from "@/ui/atoms/modal";
import MainComponent from "@/ui/organisms/main/main";
import RegisterForm from "@/ui/organisms/formServices/RegisterForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import EditForm from "@/ui/organisms/formServices/EditForm";

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
    const [ModalOpenRegister, setModalOpenRegister] = useState(false);
    const [ModalOpenEdit, setModalOpenEdit] = useState(false);
    const [SelectIdEdit, setSelectIdEdit] = useState<number>(1);

    const toggleModalRegister = () => {
        setModalOpenRegister(!ModalOpenRegister);
    }

    const toggleModalEdit = () => {
        setModalOpenEdit(!ModalOpenEdit);
    }

    const handleAdd = () => {
        toggleModalRegister();
    }

    const handleEdit = (serviceId : number) => {
        setSelectIdEdit(serviceId);
        toggleModalEdit();
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
            <Modal isOpen={ModalOpenRegister} onClose={toggleModalRegister} title="Agregar Servicio">
                    <RegisterForm onClose={toggleModalRegister}/>
            </Modal>
            <Modal isOpen={ModalOpenEdit} onClose={toggleModalEdit} title="Editar Servicio">
                    <EditForm onClose={toggleModalEdit} serviceId={SelectIdEdit}/>
            </Modal>
        </StyledContent>
    )
}