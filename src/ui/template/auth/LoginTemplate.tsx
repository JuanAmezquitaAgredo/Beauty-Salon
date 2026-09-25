'use client'
import LoginForm from "@/ui/organisms/auth/LoginForm";
import AuthShell from "./AuthShell";
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

export const LoginTemplate = () => {
    return (
        <AuthShell
            title="Bienvenida a tu salón"
            subtitle="Gestiona citas, clientes, servicios y a tu equipo desde un solo lugar."
        >
            <LoginForm />
            <FooterText>¿No tienes cuenta? <Link href="/register">Regístrate</Link></FooterText>
        </AuthShell>
    );
};

export default LoginTemplate;
