import React from 'react'
import AuthGuard from './guard/AuthGuard';

export default function Privatelayout(
    {children }:{ children: React.ReactNode; }
) {
  return (
    <AuthGuard>{children}</AuthGuard>
  )
}
