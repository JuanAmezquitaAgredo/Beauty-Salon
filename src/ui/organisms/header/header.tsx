'use client'
import React from 'react'
import styled from 'styled-components'
import { FaRegUserCircle } from "react-icons/fa";
import Button from '@/ui/atoms/button';
import { signOut } from 'next-auth/react';


const StyleHeader = styled.header`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
`;

const StyleTitle = styled.h1`
    font-size: 20px;
    color: #D4AF37;    
`;

const StyledButton = styled(Button)`
  width: 100px;
  height: 50px;
  border-color: #7b7b7b;
  background-color: #B8A1C9;
  color: #FFFFFF;
  border-radius: 5px;
  &:hover {
        background-color: #9e89b2;
    }
`;
export default function HeaderComponent() {

    const handleSignOut = async () => {
        await signOut();
    }
    return (
        <StyleHeader>
            <FaRegUserCircle size={45}/>
            <StyleTitle>Menu de Administrador</StyleTitle>
            <StyledButton type='button' label='Cerrar Sesión' onClick={handleSignOut} />
        </StyleHeader>
    )
}
