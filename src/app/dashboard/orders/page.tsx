"use client";
import { Tabs, Title } from '@mantine/core';
import React from 'react'
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';
import OrderListTable from './component/order-list-table';
import DocumentTable from './component/document-table';

const DashboardPage = () => {
    const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD)
    return (
        <>
       <Title className='h3 p-[10px_0px]'>Orders</Title>
        <Tabs defaultValue={'orders'}>
            <Tabs.List>
                <Tabs.Tab value={'orders'}>Order List</Tabs.Tab>
                <Tabs.Tab value={'document'}>Document</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={'orders'}>
                <OrderListTable />
            </Tabs.Panel>
            <Tabs.Panel value={'document'}>
                <DocumentTable />
            </Tabs.Panel>
        </Tabs>
        </>
    )
}

export default DashboardPage