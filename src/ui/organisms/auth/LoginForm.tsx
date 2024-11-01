'use client'
import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import FormField from "@/ui/molecules/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styled from "styled-components";
import Button from "@/ui/atoms/button";
import { signIn } from "next-auth/react";
import { ErrorResponse, FieldError } from "@/app/core/application/dto/common/error-response.dto";
import { useRouter } from "next/navigation";

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
    color: #D4AF37;
    `;

const LoginForm = () => {
    const router = useRouter();
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

    const handleLogin = async (data: ILoginRequest) => {
        console.log(data);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                username: data.userName,
                password: data.password
            })

            if(result?.error){
                console.log("ocurio un error", JSON.parse(result.error));
                handleError( JSON.parse(result.error));
                return
            }

            router.push("/dashboard/services");
        } catch (error) {
            console.log(error);
        }
    }

    const handleError = (error:unknown) => {
        const errorData = error as ErrorResponse
        if(errorData.errors && errorData){
            if(Array.isArray(errorData.errors) && "field" in errorData.errors[0]){
                errorData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof ILoginRequest, { message: error });
                });
            }else{
                if("message" in errorData.errors[0]){
                    setError("userName", {
                        message: errorData.errors[0].message
                    })
                }
            }
        };
    };


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
