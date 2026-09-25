'use client'
import { IAppointmentResponse } from "@/app/core/application/dto/appointments/appointment-response.dto";
import { IPage } from "@/app/infrastucture/utils/pagination";
import Modal from "@/ui/atoms/modal";
import MainComponent from "@/ui/organisms/main/main";
import AppointmentForm from "@/ui/organisms/formAppointments/AppointmentForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import Loading from "@/ui/atoms/loading";
import { getApiErrorMessage } from "@/ui/utils/api-error";

interface IDataAppointment {
    pagination: Pageable
    data: IPage<IAppointmentResponse>
}

const StyledContent = styled.div`
   display: flex;
   justify-content: baseline;
   align-items: center;
   width: 80%;
   height: 80vh;
   margin: 30px;
`;

// Zona horaria fija para que el render del servidor y el del navegador coincidan
const dateFormatter = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Bogota",
});

// La tabla muestra las columnas en el orden de las llaves; `id` debe ir primero
const toRow = (a: IAppointmentResponse) => ({
    id: a.id,
    dateTime: dateFormatter.format(new Date(a.dateTime)),
    client: `${a.client.firstName} ${a.client.lastName}`,
    service: a.service.name,
    employee: `${a.employee.firstName} ${a.employee.lastName}`,
    duration: `${a.duration} min`,
    comments: a.comments,
});

export default function DataAppointments({ data, pagination }: IDataAppointment) {

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
            const response = await fetch(`/api/appointments/delete/${Id}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error(await getApiErrorMessage(response, "Error al eliminar la cita"));
            }

            alert("Cita eliminada exitosamente");
            router.refresh();
        } catch (error) {
            console.error("Error en el DELETE:", error);
            alert((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const tableData = { ...data, content: data.content.map(toRow) };

    return (
        <StyledContent>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <MainComponent data={tableData} onEdit={handleEdit} onDelete={handleDelete} pagination={pagination} NameButtonAdd="Agregar Cita" handleAdd={toggleModalRegister} />
                    <Modal isOpen={ModalOpenRegister} onClose={toggleModalRegister} title="Agregar Cita">
                        <AppointmentForm onClose={toggleModalRegister} />
                    </Modal>
                    <Modal isOpen={ModalOpenEdit} onClose={toggleModalEdit} title="Editar Cita">
                        <AppointmentForm onClose={toggleModalEdit} Id={SelectIdEdit} />
                    </Modal>
                </>
            )}
        </StyledContent>
    )
}
