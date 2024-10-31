import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    label?: string;
    type?: 'button' |'submit' |'reset';
    onClick?: () => void;
}

const StyledButton = styled.button`
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

const Button = ({
    label,
    type,
    onClick,
   ...props
}: ButtonProps) => {
    return(
        <StyledButton type={type} onClick={onClick} {...props}>
            {label}
        </StyledButton>
    );
};

export default Button;