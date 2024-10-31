'use client'
import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import FormField from "@/ui/molecules/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styled from "styled-components";
import Button from "@/ui/atoms/button";

const loginSchema = yup.object().shape({
    userName: yup
        .string()
        .email('Email invalido')
        .required('Email Requerido'),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Contraseña Requerida'),     
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
`;

const LoginForm = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema)
    });

    const handleLogin = (data: ILoginRequest) => {
        console.log(data);
    }

    return (
        <FormContainer onSubmit={handleSubmit(handleLogin)}>
            <Title>Iniciar Sesión</Title>

            <FormField<ILoginRequest>
                control={control}
                type="email"
                name="userName"
                label="Correo Electrónico"
                error={errors.userName}
                placeholder="Ingrese Correo Electrónico"
            />
            <FormField<ILoginRequest>
                control={control}
                type="password"
                name="password"
                label="Contraseña"
                error={errors.password}
                placeholder="Ingrese Contraseña"
            />
            <Button type="submit" label="Iniciar Sesión"/>
        </FormContainer>
    );
};

export default LoginForm;
