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
    Id: number;
}

const registerSchema = yup.object().shape({
    name: yup.string().min(1, 'El nombre debe tener al menos 1 carácter').required('Nombre del servicio requerido'),
    description: yup.string().min(1, 'La descripción debe tener al menos 1 carácter').required('Descripción requerida'),
    price: yup.number().min(10, 'El valor mínimo es 10').required('Precio requerido')
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

const EditForm = ({ onClose, Id }: Iprops) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { control, handleSubmit: onSubmit, setValue, formState: { errors } } = useForm<IEditServiceRequest>({
        mode: "onChange",
        resolver: yupResolver(registerSchema),
    });

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/services/getservice/${Id}`);
                const data = await response.json();
                setValue("name", data.name);
                setValue("description", data.description);
                setValue("price", data.price);
            } catch (error) {
                console.error("Error fetching service data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceData();
    }, [Id, setValue]);

    const handleEdit = async (data: IEditServiceRequest) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/services/edit/${Id}`, {
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
                    <FormField<IEditServiceRequest>
                        control={control}
                        type="text"
                        name="name"
                        label="Nombre del Servicio"
                        error={errors.name}
                        placeholder="Ingrese nombre del servicio"
                    />

                    <FormField<IEditServiceRequest>
                        control={control}
                        type="text"
                        name="description"
                        label="Descripción"
                        error={errors.description}
                        placeholder="Ingrese la descripción"
                    />

                    <FormField<IEditServiceRequest>
                        control={control}
                        type="number"
                        name="price"
                        label="Precio"
                        error={errors.price}
                        placeholder="Ingrese el precio"
                    />

                    <Button type="submit" label="Actualizar Servicio" />
                </>
            )}
        </FormContainer>
    );
};

export default EditForm;
