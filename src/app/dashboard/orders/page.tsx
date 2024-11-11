"use client";
import { Tabs, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';
import OrderListTable from './component/order-list-table';
import useAuthStore from '@/store/auth';
import { redirect } from 'next/navigation'

const DashboardPage = () => {
    const authStore = useAuthStore();
    const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD, {
        startDate: '2024-10-26 01:15:00',
        endDate: '2025-10-26 05:15:00',
        limit: 10,
        skip: 0,
    })

    useEffect(() => {
        if (!DASHBOARD_API.data && DASHBOARD_DATA.error?.status === 500) {
            authStore.logOut();
            redirect('/login'); 
        }
    }, [DASHBOARD_DATA.error, authStore]);

    if (!authStore.isAuthenticated) {
        redirect('/login');
    }


    return (
        <> 
            <Title className='h3 p-[10px_0px]'>Orders</Title>
            <Tabs defaultValue={'orders'}>
                <Tabs.List>
                    <Tabs.Tab value={'orders'}>Order List</Tabs.Tab>
                    <Tabs.Tab value={'document'}>Document</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={'orders'}>
                    <OrderListTable data={DASHBOARD_DATA.data?.data?.orders ?? []}
                    loading={DASHBOARD_DATA.isLoading} />
                </Tabs.Panel>
                {/* <Tabs.Panel value={'document'}>
                    <DocumentTable data={dashboardData} />
                </Tabs.Panel> */}
            </Tabs>
        </>
    );
}

export default DashboardPage;
