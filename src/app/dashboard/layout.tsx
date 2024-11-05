"use client"
import useAuthStore from '@/store/auth'
import { redirect } from 'next/navigation'
import React from 'react'

import "./style.scss"

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const authStore = useAuthStore()

    if (authStore && !authStore.isAuthenticated) redirect("/login")
    return (
        <>{children}</>
    )
}

export default DashboardLayout