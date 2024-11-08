'use client'
import Button from "@/ui/atoms/button";
import Loading from "@/ui/atoms/loading";
import FormField from "@/ui/molecules/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

interface Iprops {
    onClose: () => void;
}

const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(1, 'El nombre de cliente debe tener al menos 1 caracter')
        .required('Nombre del cliente Requerido'),
    lastName: yup
        .string()
        .min(1, 'El apeelido de cliente debe tener al menos 1 caracter')
        .required('Apellido del cliente Requerido'),
    email: yup
        .string()
        .email('Email invalido')
        .required('Email Requerido'),
    phone: yup
        .string()
        .required('Teléfono Requerido')
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

const RegisterForm = ({ onClose }: Iprops) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        control,
        handleSubmit: onSubmit,
        setError,
        formState: { errors }
    } = useForm<IRegiterClientRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    const handleRegister = async (data: IRegiterClientRequest) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/clients/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Error al registrar el servicio");
            }

            alert('Cliente registrado exitosamente');
            router.refresh();
            onClose();
            return await response.json();

        } catch (error) {
            console.error("Error en el POST:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer onSubmit={onSubmit(handleRegister)}>
            <Title>Registro</Title>

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <FormField<IRegiterClientRequest>
                        control={control}
                        type="text"
                        name="firstName"
                        label="Nombre"
                        error={errors.firstName}
                        placeholder="Ingrese el Nombre"
                    />

                    <FormField<IRegiterClientRequest>
                        control={control}
                        type="text"
                        name="lastName"
                        label="Apellido"
                        error={errors.lastName}
                        placeholder="Ingrese el Apellido"
                    />

                    <FormField<IRegiterClientRequest>
                        control={control}
                        type="text"
                        name="email"
                        label="Email"
                        error={errors.email}
                        placeholder="Ingrese el Email"
                    />

                    <FormField<IRegiterClientRequest>
                        control={control}
                        type="text"
                        name="phone"
                        label="Celular"
                        error={errors.phone}
                        placeholder="Ingrese el Numero de Celular"
                    />

                    <Button type="submit" label="Registrar" />
                </>
            )}
        </FormContainer>
    );
};

export default RegisterForm;
