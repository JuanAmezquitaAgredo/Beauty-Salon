'use client'
import { IRegisterUserRequest } from "@/app/core/application/dto/users/register-user-request.dto";
import { ErrorResponse, FieldError } from "@/app/core/application/dto/common/error-response.dto";
import Button from "@/ui/atoms/button";
import Loading from "@/ui/atoms/loading";
import FormField from "@/ui/molecules/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(1, 'El nombre debe tener al menos 1 caracter')
        .required('Nombre Requerido'),
    lastName: yup
        .string()
        .min(1, 'El apellido debe tener al menos 1 caracter')
        .required('Apellido Requerido'),
    email: yup
        .string()
        .email('Email invalido')
        .required('Email Requerido'),
    phone: yup
        .string()
        .default(""),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Contraseña Requerida'),
})

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

const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<IRegisterUserRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema),
        defaultValues: { firstName: "", lastName: "", email: "", phone: "", password: "" },
    })

    const handleError = (errorData: ErrorResponse) => {
        const first = errorData.errors?.[0];
        if (!first) return;
        if ("field" in first) {
            (errorData.errors as FieldError[]).forEach(({ field, error }) => {
                setError(field as keyof IRegisterUserRequest, { message: error });
            });
        } else {
            setError("email", { message: first.message });
        }
    };

    const handleRegister = async (data: IRegisterUserRequest) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                handleError(await response.json());
                return;
            }

            // Inicia sesión automáticamente con el usuario recién creado
            const result = await signIn("credentials", {
                redirect: false,
                username: data.email,
                password: data.password,
            });

            router.push(result?.error ? "/login" : "/dashboard/services");
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Error al registrar el usuario");
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <Loading />;

    return (
        <FormContainer onSubmit={handleSubmit(handleRegister)}>
            <Title>Registro</Title>

            <FormField<IRegisterUserRequest>
                control={control}
                type="text"
                name="firstName"
                label="Nombre"
                error={errors.firstName}
                placeholder="Ingrese Nombre"
            />

            <FormField<IRegisterUserRequest>
                control={control}
                type="text"
                name="lastName"
                label="Apellido"
                error={errors.lastName}
                placeholder="Ingrese Apellido"
            />

            <FormField<IRegisterUserRequest>
                control={control}
                type="email"
                name="email"
                label="Correo Electrónico"
                error={errors.email}
                placeholder="Ingrese Correo Electrónico"
            />

            <FormField<IRegisterUserRequest>
                control={control}
                type="text"
                name="phone"
                label="Teléfono"
                error={errors.phone}
                placeholder="Ingrese Teléfono (opcional)"
            />

            <FormField<IRegisterUserRequest>
                control={control}
                type="password"
                name="password"
                label="Contraseña"
                error={errors.password}
                placeholder="Ingrese Contraseña"
            />

            <Button type="submit" label="Registrarse" />

        </FormContainer>
    );
};

export default RegisterForm;
