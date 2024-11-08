"use client";
import { Tabs, Title } from '@mantine/core';
import React from 'react'
const DashboardPage = () => {
    return (
        <>
        <Title className='h3 p-[10px_0px]'>New Order</Title>
        <Tabs defaultValue={'new_order'}>
            <Tabs.List>
                <Tabs.Tab value={'new_order'}>New Order</Tabs.Tab>
                <Tabs.Tab value={'batch_import'}>Batch Import</Tabs.Tab>
                <Tabs.Tab value={'public_api'}>Public API</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={'orders'}>
                {/* <Summary order= {order} /> */}
                ksjhf
            </Tabs.Panel>
            {/* <Tabs.Panel value={'document'}>
                <DocumentTable data={dashboardData} />
            </Tabs.Panel> */}
        </Tabs>
        </>
);
}

export default DashboardPage