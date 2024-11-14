"use client"
import useAuthStore from '@/store/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Sidebar from "./components/sidebar"
import "./style.scss"
import LoginPage from '@/components/login/googleLogin'

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const authStore = useAuthStore()

    if (authStore && !authStore.isAuthenticated){
        return <LoginPage />
    }
    return (
        <>
            <div className="flex">
                <div className="flex-[0_0_15%]">
                    <Sidebar />
                </div>
                <div className="flex-[0_0_85%] px-8 bg-backdrop">
                    {children}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout