'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function PublicGuard(
    { children }: { children: React.ReactNode; }
) {
    const { data, status } = useSession()
    const router = useRouter();
    console.log(data, status)

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard/services')
        }
    }, [status])

    if (status === 'unauthenticated') {
        return (
            <>{children}</>
        )
    }

    if(status === 'loading') {
        return (
            <div>Loading...</div>
        )
    }
}
