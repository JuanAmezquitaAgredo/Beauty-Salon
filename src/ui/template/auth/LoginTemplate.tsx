'use client'
import LoginForm from "@/ui/organisms/auth/LoginForm";
import styled from "styled-components";

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6; 
`;

const CardContainer = styled.div`
    width: 100%;
    max-width: 28rem; 
    padding: 1.5rem; 
    background-color: white;
    border-radius: 0.5rem; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
`;

const InstructionText = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
`;

export const LoginTemplate = () => {
    return (
        <PageContainer>
            <CardContainer>
                <InstructionText>Inicia sesión en tu cuenta</InstructionText>
                <LoginForm />
            </CardContainer>
        </PageContainer>
    );
};

export default LoginTemplate;
