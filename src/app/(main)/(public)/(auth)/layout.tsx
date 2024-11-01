import React from 'react'
import PublicGuard from './guard/PublicGuard';

export default function Publiclayout(
    {children }:{ children: React.ReactNode; }
) {
  return (
    <PublicGuard>{children}</PublicGuard>
  )
}
