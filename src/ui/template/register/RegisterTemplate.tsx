'use client'
import RegisterForm from "@/ui/organisms/registerGeneral/RegisterForm";
import Link from "next/link";
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

const FooterText = styled.p`
    font-size: 0.875rem;
    text-align: center;
    color: #666666;

    a {
        color: #B8A1C9;
        font-weight: 600;
    }
`;

export const RegisterTemplate = () => {
    return (
        <PageContainer>
            <CardContainer>
                <InstructionText>Registrate</InstructionText>
                <RegisterForm />
                <FooterText>¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></FooterText>
            </CardContainer>
        </PageContainer>
    );
};

export default RegisterTemplate;
