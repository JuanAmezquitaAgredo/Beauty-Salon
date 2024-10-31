import React from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  name?: string;
  error?: string; 
}


const StyledInput = styled.input<{ error?: string }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: #4a5568;
  border: ${({ error }) => (error ? '1px solid #f56565' : '1px solid #e2e8f0')}; 
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

export const Input = ({
  placeholder,
  type = "text",
  name,
  error,
  ...props
}: InputProps) => {
  return (
    <>
      <StyledInput
        type={type}
        name={name}
        placeholder={placeholder}
        error={error}
        {...props}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default Input;
