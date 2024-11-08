import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/ui/atoms/button";
import FormField from "@/ui/molecules/common/FormField";
import styled from "styled-components";
import * as yup from "yup";
import Loading from "@/ui/atoms/loading";
import { useRouter } from "next/navigation";

interface Iprops {
    onClose: () => void;
    serviceId: number;
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

const EditForm = ({ onClose, serviceId }: Iprops) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { control, handleSubmit: onSubmit, setValue, formState: { errors } } = useForm<IEditClientRequest>({
        mode: "onChange",
        resolver: yupResolver(registerSchema),
    });

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/services/getservice/${serviceId}`);
                const data = await response.json();
                setValue("firstName", data.firstName);
                setValue("lastName", data.lastName);
                setValue("email", data.email);
                setValue("phone", data.phone);
            } catch (error) {
                console.error("Error fetching service data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceData();
    }, [serviceId, setValue]);

    const handleEdit = async (data: IEditClientRequest) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/services/edit/${serviceId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el servicio");
            }

            alert("Servicio actualizado exitosamente");
            router.refresh();
            onClose();
        } catch (error) {
            console.error("Error en el PUT:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer onSubmit={onSubmit(handleEdit)}>
            <Title>Editar</Title>

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


                    <Button type="submit" label="Actualizar Servicio" />
                </>
            )}
        </FormContainer>
    );
};

export default EditForm;
