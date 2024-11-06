import { IRegisterServiceRequest } from "@/app/core/application/dto/services/register-request.dto";
import Button from "@/ui/atoms/button";
import FormField from "@/ui/molecules/common/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

interface Iprops{
    onClose: () => void;
}

const registerSchema = yup.object().shape({
    name: yup
        .string()
        .min(1, 'El nombre de usuario debe tener al menos 1 caracter')
        .required('Nombre del servicio Requerido'),
    description: yup
        .string()
        .min(1, 'La descripción debe tener al menos 1 caracter')
        .required('Descripción Requerida'),
    price: yup
        .number()
        .min(10, 'El valor minimo es 10')
        .required('El precio es requerido')
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

const RegisterForm = ({onClose}:Iprops) => {

    const router = useRouter();
    const {
        control,
        handleSubmit: onSubmit, 
        setError,
        formState: { errors }
    } = useForm<IRegisterServiceRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    const handleRegister = async (data: IRegisterServiceRequest) => {
        try {
            const response = await fetch("/api/services/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Error al registrar el servicio");
            }

            alert('Servicio registrado exitosamente');
            router.refresh();
            onClose();
            return await response.json();
            
        } catch (error) {
            console.error("Error en el POST:", error);
            throw error;
        }
    };

    return (
        <FormContainer onSubmit={onSubmit(handleRegister)}>
            <Title>Registro</Title>

            <FormField<IRegisterServiceRequest>
                control={control}
                type="name"
                name="name"
                label="Nombre del Servicio"
                error={errors.name}
                placeholder="Ingrese nombre del servicio"
            />

            <FormField<IRegisterServiceRequest>
                control={control}
                type="description"
                name="description"
                label="Descripcion"
                error={errors.description}
                placeholder="Ingrese la descripcion"
            />

            <FormField<IRegisterServiceRequest>
                control={control}
                type="price"
                name="price"
                label="Precio"
                error={errors.price}
                placeholder="Ingrese el Precio"
            />

            <Button type="submit" label="Registrar" />
        </FormContainer>
    );
};

export default RegisterForm;
