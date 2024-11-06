"use client";
import React from 'react'
import DashboardSection from './_sections/dashboard';
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';

const DashboardPage = () => {
    const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD)
    return (
        <main className='bg-backdrop'>
            <DashboardSection />
        </main>
    )
}

export default DashboardPage