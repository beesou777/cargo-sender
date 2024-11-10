"use client";
import React, { useEffect } from 'react'
import DashboardSection from './_sections/dashboard';
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';
import { redirect } from 'next/navigation'
import useAuthStore from '@/store/auth';
const DashboardPage = () => {
    const authStore = useAuthStore()
        const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD,{
            startDate:'2024-10-26 01:15:00',
            endDate: '2025-10-26 05:15:00',
            limit: 10,
            skip: 0,
        })
        useEffect(() => {
            if (!DASHBOARD_API.data && DASHBOARD_DATA.error?.status === 500) {
                authStore.logOut();
                redirect('/login'); // Uncomment this to redirect after logout
            }
        }, [DASHBOARD_DATA.error, authStore]);
    
        if (!authStore.isAuthenticated) {
            redirect('/login'); // Ensure redirect if user is not authenticated
        }
    return (
        <main className='bg-backdrop'>
            <DashboardSection data={DASHBOARD_DATA.data} />
        </main>
    )
}

export default DashboardPage