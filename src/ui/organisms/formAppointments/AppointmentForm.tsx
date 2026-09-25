'use client'
import { IAppointmentRequest } from "@/app/core/application/dto/appointments/appointment-request.dto";
import { IAppointmentOptions, IAppointmentResponse } from "@/app/core/application/dto/appointments/appointment-response.dto";
import Button from "@/ui/atoms/button";
import Loading from "@/ui/atoms/loading";
import FormField from "@/ui/molecules/common/FormField";
import { FormSelectField } from "@/ui/molecules/common/FormSelectField";
import { getApiErrorMessage } from "@/ui/utils/api-error";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

interface Iprops {
    onClose: () => void;
    // Si viene Id el formulario edita, si no, registra
    Id?: number;
}

// Los selects y el input datetime-local trabajan con strings
interface IAppointmentForm {
    dateTime: string;
    duration: number;
    comments: string;
    clientId: string;
    serviceId: string;
    employeeId: string;
}

const appointmentSchema = yup.object().shape({
    dateTime: yup.string().required('Fecha y hora Requerida'),
    duration: yup.number().typeError('La duración debe ser un número').integer().min(1, 'Duración mínima 1 minuto').required('Duración Requerida'),
    comments: yup.string().default(""),
    clientId: yup.string().required('Cliente Requerido'),
    serviceId: yup.string().required('Servicio Requerido'),
    employeeId: yup.string().required('Empleado Requerido'),
});

// ISO (UTC) -> "YYYY-MM-DDTHH:mm" en la hora local del navegador, formato que espera datetime-local
const toLocalInput = (iso: string) => {
    const date = new Date(iso);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const FormContainer = styled.form`
    width: 100%;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: #D4AF37;
`;

const AppointmentForm = ({ onClose, Id }: Iprops) => {
    const router = useRouter();
    const isEdit = Id !== undefined;
    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState<IAppointmentOptions>({ clients: [], services: [], employees: [] });
    const { control, handleSubmit: onSubmit, reset, formState: { errors } } = useForm<IAppointmentForm>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(appointmentSchema),
        defaultValues: { dateTime: "", duration: 60, comments: "", clientId: "", serviceId: "", employeeId: "" },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const optionsResponse = await fetch("/api/appointments/options");
                setOptions(await optionsResponse.json());

                if (isEdit) {
                    const response = await fetch(`/api/appointments/getappointment/${Id}`);
                    const data: IAppointmentResponse = await response.json();
                    reset({
                        dateTime: toLocalInput(data.dateTime),
                        duration: data.duration,
                        comments: data.comments,
                        clientId: String(data.clientId),
                        serviceId: String(data.serviceId),
                        employeeId: String(data.employeeId),
                    });
                }
            } catch (error) {
                console.error("Error fetching appointment data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [Id, isEdit, reset]);

    const handleSave = async (data: IAppointmentForm) => {
        const body: IAppointmentRequest = {
            dateTime: new Date(data.dateTime).toISOString(),
            duration: Number(data.duration),
            comments: data.comments ?? "",
            clientId: Number(data.clientId),
            serviceId: Number(data.serviceId),
            employeeId: Number(data.employeeId),
        };

        setIsLoading(true);
        try {
            const response = await fetch(isEdit ? `/api/appointments/edit/${Id}` : "/api/appointments/create", {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(await getApiErrorMessage(response, "Error al guardar la cita"));
            }

            alert(isEdit ? "Cita actualizada exitosamente" : "Cita registrada exitosamente");
            router.refresh();
            onClose();
        } catch (error) {
            console.error("Error al guardar la cita:", error);
            alert((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer onSubmit={onSubmit(handleSave)}>
            <Title>{isEdit ? "Editar" : "Registro"}</Title>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <FormSelectField<IAppointmentForm>
                        control={control}
                        options={options.clients}
                        name="clientId"
                        label="Cliente"
                        error={errors.clientId}
                        placeholder="Seleccione un cliente"
                    />

                    <FormSelectField<IAppointmentForm>
                        control={control}
                        options={options.services}
                        name="serviceId"
                        label="Servicio"
                        error={errors.serviceId}
                        placeholder="Seleccione un servicio"
                    />

                    <FormSelectField<IAppointmentForm>
                        control={control}
                        options={options.employees}
                        name="employeeId"
                        label="Empleado"
                        error={errors.employeeId}
                        placeholder="Seleccione un empleado"
                    />

                    <FormField<IAppointmentForm>
                        control={control}
                        type="datetime-local"
                        name="dateTime"
                        label="Fecha y hora"
                        error={errors.dateTime}
                    />

                    <FormField<IAppointmentForm>
                        control={control}
                        type="number"
                        name="duration"
                        label="Duración (minutos)"
                        error={errors.duration}
                        placeholder="Ingrese la duración"
                    />

                    <FormField<IAppointmentForm>
                        control={control}
                        type="text"
                        name="comments"
                        label="Comentarios"
                        error={errors.comments}
                        placeholder="Ingrese comentarios (opcional)"
                    />

                    <Button type="submit" label={isEdit ? "Actualizar Cita" : "Registrar"} />
                </>
            )}
        </FormContainer>
    );
};

export default AppointmentForm;
