import { IRegisterRequest } from "@/app/core/application/dto/services/register-request.dto";
import Button from "@/ui/atoms/button";
import FormField from "@/ui/molecules/common/FormField";
import { FormSelectField } from "@/ui/molecules/common/FormSelectField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

const registerSchema = yup.object().shape({
    name: yup
        .string()
        .min(1, 'El nombre de usuario debe tener al menos 1 caracter')
        .required('Nombre de usuario Requerido'),
    description: yup
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Contraseña Requerida'),
    price: yup
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
        .required('Teléfono Requerido'),
    role: yup
        .string()
        .required('Rol Requerido'),
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
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<IRegisterRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema)
    })

    const handleRegister = (data: IRegisterRequest) => {
        console.log(data);
    }

    return (
        <FormContainer onSubmit={handleSubmit(handleRegister)}>
            <Title>Registro</Title>

            <FormField<IRegisterRequest>
                control={control}
                type="userName"
                name="userName"
                label="Nombre de Usuario"
                error={errors.userName}
                placeholder="Ingrese nombre de Usuario"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="password"
                name="password"
                label="Contraseña"
                error={errors.password}
                placeholder="Ingrese Contraseña"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="firstName"
                name="firstName"
                label="Nombre"
                error={errors.firstName}
                placeholder="Ingrese Nombre"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="lastName"
                name="lastName"
                label="Apellido"
                error={errors.lastName}
                placeholder="Ingrese Apellido"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="email"
                name="email"
                label="Email"
                error={errors.email}
                placeholder="Ingrese Email"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="phone"
                name="phone"
                label="Teléfono"
                error={errors.phone}
                placeholder="Ingrese Teléfono"
            />

            <FormSelectField<IRegisterRequest>
                control={control}
                options={[
                    { value: "admin", label: "Administrador" },
                    { value: "user", label: "Usuario" }
                ]}
                name="role"
                label="Rol"
                error={errors.role}
                placeholder="Ingrese Rol"
            />

            <Button type="submit" label="Registrarse" />

        </FormContainer>
    );
};

export default RegisterForm;