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
    background-color: #FAF3EF;
`;

const StyleTitle = styled.h1`
    font-size: 35px;
    color: #D4AF37;    
`;

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
  background-color: #B8A1C9;
  color: #FFFFFF;
  border-radius: 5px;
  border: none;
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
            <FaRegUserCircle size={50}/>
            <StyleTitle>Salon de Belleza</StyleTitle>
            <StyledButton type='button' label='Cerrar Sesión' onClick={handleSignOut} />
        </StyleHeader>
    )
}
