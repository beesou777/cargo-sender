"use client";
import { Tabs } from '@mantine/core';
import React from 'react'
import ProfileSection from './_section/profile';
import OrdersSection from './_section/orders';
import DashboardSection from './_section/dashboard';
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';

const DashboardPage = () => {
    const { data, isLoading, isError, error } = useQuery(DASHBOARD_API.DASHBOARD)
    console.log(data, error)
    return (
        <main className='bg-backdrop'>
            <Tabs className='min-h-svh' orientation="vertical" defaultValue="profile" variant='pills'>
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