'use client'
import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import FormField from "@/ui/molecules/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styled from "styled-components";

const loginSchema = yup.object().shape({
    userName: yup
        .string()
        .email('Invalid email address')
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required')     
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

const SubmitButton = styled.button`
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    font-weight: 500;
    border-radius: 0.375rem;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: #2563eb;
    }
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
            <SubmitButton type="submit">
                Iniciar Sesión
            </SubmitButton>
        </FormContainer>
    );
};

export default LoginForm;
