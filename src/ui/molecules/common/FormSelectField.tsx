import InputSelect from "@/ui/atoms/InputSelect";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

interface IpropsFormSelectField<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    placeholder?: string;
    options: { value: string, label: string }[];
}

const FormSelectFieldContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #D4AF37;
`;

export const FormSelectField = <T extends FieldValues>({
    label,
    name,
    control,
    error,
    id,
    placeholder,
    options,
}: IpropsFormSelectField<T>) => {
    return(
        <FormSelectFieldContainer>
            <Label htmlFor={id || label.toLowerCase()}>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <InputSelect
                        id={id || label.toLowerCase()}
                        error={error?.message}
                        options={options}
                        placeholder={placeholder || `Ingrese su ${label.toLowerCase()}`}
                        {...field}
                    />
                )}
            />
        </FormSelectFieldContainer>
    )
}