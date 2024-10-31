"use client"

import Input from "@/ui/atoms/Input";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

interface IpropsFormField<T extends FieldValues> {
    label: string;
    type: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    placeholder?: string;
}

const FormFieldContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

export const FormField = <T extends FieldValues>({
    label,
    type,
    name,
    control,
    error,
    id,
    placeholder,
}: IpropsFormField<T>) => {
    return (
        <FormFieldContainer>
            <Label htmlFor={id || label.toLowerCase()}>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        id={id || label.toLowerCase()}
                        type={type}
                        error={error?.message}
                        placeholder={placeholder || `Ingrese su ${label.toLowerCase()}`}
                        {...field}
                    />
                )}
            />
        </FormFieldContainer>
    );
};

export default FormField;
