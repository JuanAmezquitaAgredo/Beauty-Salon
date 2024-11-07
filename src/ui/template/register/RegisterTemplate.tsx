'use client'
import RegisterForm from "@/ui/organisms/formServices/RegisterForm";
import styled from "styled-components";

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FAF3EF; 
`;

const CardContainer = styled.div`
    width: 100%;
    max-width: 28rem; 
    padding: 1rem; 
    background-color: white;
    border-radius: 0.5rem; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
`;

const InstructionText = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #666666;
`;

export const RegisterTemplate = () => {
    return (
        <PageContainer>
            <CardContainer>
                <InstructionText>Registrate</InstructionText>
                <RegisterForm />
            </CardContainer>
        </PageContainer>
    );
};

export default RegisterTemplate;
