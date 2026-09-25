'use client'
import RegisterForm from "@/ui/organisms/registerGeneral/RegisterForm";
import AuthShell from "@/ui/template/auth/AuthShell";
import Link from "next/link";
import styled from "styled-components";

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
        <AuthShell
            title="Crea tu cuenta"
            subtitle="Regístrate para empezar a administrar tu salón."
        >
            <RegisterForm />
            <FooterText>¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></FooterText>
        </AuthShell>
    );
};

export default RegisterTemplate;
