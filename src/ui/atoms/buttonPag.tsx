import styled from "styled-components";

interface ButtonPagProps {
    label: string;
    onClick: (e: React.FormEvent) => void;
}

const Buttonpag = styled.button`
    width: 30px;
    height:40px;
    margin: 0 7px;
    border-radius: 40%;
    background-color: rgb(243, 244, 246);
    &:hover {
        background-color: rgb(229, 231, 235);
    }
`;
export default function ButtonPag({ label, onClick }: ButtonPagProps){
    return(
        <Buttonpag onClick={onClick}>{label}</Buttonpag>
    );
};