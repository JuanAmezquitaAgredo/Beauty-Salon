'use client'
import Modal from "@/ui/atoms/modal";
import MainComponent from "@/ui/organisms/main/main";
import RegisterForm from "@/ui/organisms/formClients/RegisterForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import EditForm from "@/ui/organisms/formClients/EditForm";
import Loading from "@/ui/atoms/loading";

interface IDataClient {
    pagination: Pageable
    data: IClientsResponse
}

const StyledContent = styled.div`
   display: flex;
   justify-content: baseline;
   align-items: center;
   width: 80%;
   height: 80vh;
   margin: 30px;
`;
export default function DataClients({ data, pagination }: IDataClient) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
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

    const handleEdit = (Id: number) => {
        setSelectIdEdit(Id);
        toggleModalEdit();
    }

    const handleDelete = async (Id: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/clients/delete/${Id}`, {
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <StyledContent>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <MainComponent data={data} onEdit={handleEdit} onDelete={(Id) => handleDelete(Id)} pagination={pagination} NameButtonAdd="Agregar Cliente" handleAdd={handleAdd} />
                    <Modal isOpen={ModalOpenRegister} onClose={toggleModalRegister} title="Agregar Cliente">
                        <RegisterForm onClose={toggleModalRegister} />
                    </Modal>
                    <Modal isOpen={ModalOpenEdit} onClose={toggleModalEdit} title="Editar Cliente">
                        <EditForm onClose={toggleModalEdit} Id={SelectIdEdit} />
                    </Modal>
                </>
            )}
        </StyledContent>
    )
}