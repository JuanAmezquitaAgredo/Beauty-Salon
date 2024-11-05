import styled from "styled-components";

interface InputselectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string, label: string }[];
    placeholder?: string;
    error?: string;
    name?: string;
}

const StyledSelect = styled.select<{ $error?: string }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: #747576;
  border: ${({ $error }) => ($error ? '1px solid #f08484' : '1px solid #e2e8f0')};
  background-color: white;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px #4299e1;
  }
`;

const InputSelect = ({
    options,
    placeholder = "Seleccione",
    error,
    name,
    ...props
}: InputselectProps) => {
    return (
        <div>
            <StyledSelect
                name={name}
                $error={error}
                {...props}
            >
                <option>{placeholder}</option>
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </StyledSelect>
            {error && <p style={{ color: "#f79393", fontSize: "12px", marginTop: "5px" }}>{error}</p>}
        </div>
    );
};

export default InputSelect;
