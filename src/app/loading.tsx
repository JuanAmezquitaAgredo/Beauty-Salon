'use client'
import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`;

const SpinnerWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  margin: 100px auto;
`;

const Bounce = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #D4AF37;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounce} 2s infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: -1s;
  }
`;

export default function Loading() {
  return (
    <SpinnerWrapper>
      <Bounce />
      <Bounce />
    </SpinnerWrapper>
  );
};



