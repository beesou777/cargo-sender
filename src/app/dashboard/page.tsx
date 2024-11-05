"use client";
import { Tabs } from '@mantine/core';
import React from 'react'
import ProfileSection from './_sections/profile';
import OrdersSection from './_sections/orders';
import DashboardSection from './_sections/dashboard';
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';

const DashboardPage = () => {
    const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD)
    return (
        <main className='bg-backdrop'>
            <Tabs className='min-h-svh' orientation="vertical" defaultValue="dashboard" variant='pills'>
                <Tabs.List className='bg-white min-w-40 p-4 shadow-lg'>
                    <Tabs.Tab value="dashboard" >
                        Dashboard
                    </Tabs.Tab>
                    <Tabs.Tab value="orders" >
                        Orders
                    </Tabs.Tab>
                    <Tabs.Tab value="profile" >
                        Profile
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="dashboard">
                    <DashboardSection />
                </Tabs.Panel>

                <Tabs.Panel value="orders">
                    <OrdersSection />
                </Tabs.Panel>

                <Tabs.Panel value="profile">
                    <ProfileSection />
                </Tabs.Panel>
            </Tabs>

        </main>
    )
}

export default DashboardPage