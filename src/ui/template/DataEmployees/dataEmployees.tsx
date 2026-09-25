'use client'
import Modal from "@/ui/atoms/modal";
import MainComponent from "@/ui/organisms/main/main";
import EmployeeForm, { EMPLOYEE_ROLES } from "@/ui/organisms/formEmployees/EmployeeForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import Loading from "@/ui/atoms/loading";
import { getApiErrorMessage } from "@/ui/utils/api-error";

interface IDataEmployee {
    pagination: Pageable
    data: IEmployResponse
}

const StyledContent = styled.div`
   display: flex;
   justify-content: baseline;
   align-items: center;
   width: 80%;
   height: 80vh;
   margin: 30px;
`;

const roleLabel = (role: string) => EMPLOYEE_ROLES.find((r) => r.value === role)?.label ?? role;

export default function DataEmployees({ data, pagination }: IDataEmployee) {

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

    const handleEdit = (Id: number) => {
        setSelectIdEdit(Id);
        toggleModalEdit();
    }

    const handleDelete = async (Id: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/employees/delete/${Id}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error(await getApiErrorMessage(response, "Error al eliminar el empleado"));
            }

            alert("Empleado eliminado exitosamente");
            router.refresh();
        } catch (error) {
            console.error("Error en el DELETE:", error);
            alert((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const tableData = { ...data, content: data.content.map((e) => ({ ...e, role: roleLabel(e.role) })) };

    return (
        <StyledContent>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <MainComponent data={tableData} onEdit={handleEdit} onDelete={handleDelete} pagination={pagination} NameButtonAdd="Agregar Empleado" handleAdd={toggleModalRegister} />
                    <Modal isOpen={ModalOpenRegister} onClose={toggleModalRegister} title="Agregar Empleado">
                        <EmployeeForm onClose={toggleModalRegister} />
                    </Modal>
                    <Modal isOpen={ModalOpenEdit} onClose={toggleModalEdit} title="Editar Empleado">
                        <EmployeeForm onClose={toggleModalEdit} Id={SelectIdEdit} />
                    </Modal>
                </>
            )}
        </StyledContent>
    )
}
