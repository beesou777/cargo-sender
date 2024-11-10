"use client";
import { Tabs, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';
import OrderListTable from './component/order-list-table';
import useDashboardStore from '@/store/order/getOrder';

const DashboardPage = () => {
    const { dashboardData, isLoading, error, fetchDashboardData } = useDashboardStore();

    useEffect(() => {
        fetchDashboardData('2024-10-26 01:15:00', '2025-10-26 05:15:00', 10, 0);
    }, [fetchDashboardData]);

    // Log the data to check what is coming in
    useEffect(() => {
        if (dashboardData) {
            console.log('Dashboard Data:', dashboardData);
        }
    }, [dashboardData]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <> 
            <Title className='h3 p-[10px_0px]'>Orders</Title>
            <Tabs defaultValue={'orders'}>
                <Tabs.List>
                    <Tabs.Tab value={'orders'}>Order List</Tabs.Tab>
                    <Tabs.Tab value={'document'}>Document</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={'orders'}>
                    <OrderListTable data={dashboardData?.orders ?? []} />
                </Tabs.Panel>
                {/* <Tabs.Panel value={'document'}>
                    <DocumentTable data={dashboardData} />
                </Tabs.Panel> */}
            </Tabs>
        </>
    );
}

export default DashboardPage;
