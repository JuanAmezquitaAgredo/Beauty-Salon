'use client'
import { IRegisterEmployRequest } from "@/app/core/application/dto/employed/register-request.dto";
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

export const EMPLOYEE_ROLES = [
    { value: "ADMIN", label: "Administrador" },
    { value: "STYLIST", label: "Estilista" },
    { value: "RECEPTIONIST", label: "Recepcionista" },
];

const employeeSchema = yup.object().shape({
    firstName: yup.string().min(1, 'El nombre debe tener al menos 1 caracter').required('Nombre Requerido'),
    lastName: yup.string().min(1, 'El apellido debe tener al menos 1 caracter').required('Apellido Requerido'),
    email: yup.string().email('Email invalido').required('Email Requerido'),
    phone: yup.string().required('Teléfono Requerido'),
    role: yup.string().oneOf(EMPLOYEE_ROLES.map((r) => r.value), 'Seleccione un rol').required('Rol Requerido'),
});

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

const EmployeeForm = ({ onClose, Id }: Iprops) => {
    const router = useRouter();
    const isEdit = Id !== undefined;
    const [isLoading, setIsLoading] = useState(isEdit);
    const { control, handleSubmit: onSubmit, reset, formState: { errors } } = useForm<IRegisterEmployRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(employeeSchema),
    });

    useEffect(() => {
        if (!isEdit) return;
        const fetchEmployee = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/employees/getemployee/${Id}`);
                const data = await response.json();
                reset({ firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone, role: data.role });
            } catch (error) {
                console.error("Error fetching employee data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployee();
    }, [Id, isEdit, reset]);

    const handleSave = async (data: IRegisterEmployRequest) => {
        setIsLoading(true);
        try {
            const response = await fetch(isEdit ? `/api/employees/edit/${Id}` : "/api/employees/create", {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(await getApiErrorMessage(response, "Error al guardar el empleado"));
            }

            alert(isEdit ? "Empleado actualizado exitosamente" : "Empleado registrado exitosamente");
            router.refresh();
            onClose();
        } catch (error) {
            console.error("Error al guardar el empleado:", error);
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
                    <FormField<IRegisterEmployRequest>
                        control={control}
                        type="text"
                        name="firstName"
                        label="Nombre"
                        error={errors.firstName}
                        placeholder="Ingrese el Nombre"
                    />

                    <FormField<IRegisterEmployRequest>
                        control={control}
                        type="text"
                        name="lastName"
                        label="Apellido"
                        error={errors.lastName}
                        placeholder="Ingrese el Apellido"
                    />

                    <FormField<IRegisterEmployRequest>
                        control={control}
                        type="email"
                        name="email"
                        label="Email"
                        error={errors.email}
                        placeholder="Ingrese el Email"
                    />

                    <FormField<IRegisterEmployRequest>
                        control={control}
                        type="text"
                        name="phone"
                        label="Celular"
                        error={errors.phone}
                        placeholder="Ingrese el Numero de Celular"
                    />

                    <FormSelectField<IRegisterEmployRequest>
                        control={control}
                        options={EMPLOYEE_ROLES}
                        name="role"
                        label="Rol"
                        error={errors.role}
                        placeholder="Seleccione un rol"
                    />

                    <Button type="submit" label={isEdit ? "Actualizar Empleado" : "Registrar"} />
                </>
            )}
        </FormContainer>
    );
};

export default EmployeeForm;
