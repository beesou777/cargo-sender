"use client";
import React, { useEffect } from 'react';
import useDashboardStore from '@/store/order/getOrder';
import { Title, Tabs } from '@mantine/core';
import Summary from './components/summary';

interface Contact {
    name: string;
    phone: string;
}

interface Address {
    street: string;
    city: string;
    zip: string;
}

interface Shipment {
    pickupContact: Contact;
    deliveryContact: Contact;
    pickupAddress: Address;
    deliveryAddress: Address;
    pickupDate: string;
}

interface Price {
    original: {
        gross: number;
    };
}

interface Courier {
    shortName: string;
}

interface Package {
    parcelId: string;
    type: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    value: number;
    tracking?: string;
}

interface EuroSenderOrder {
    shipment: Shipment;
    price: Price;
    courier: Courier;
    parcels: {
        packages: Package[];
    };
}

interface Order {
    order_code: string;
    email: string;
    euroSenderOrder: EuroSenderOrder;
}

// Props type
interface DashboardPageProps {
    params: {
        id: string;
    };
}

export default function DashboardPage({ params }: DashboardPageProps) {
    const { dashboardData, isLoading, error, fetchDashboardData } = useDashboardStore();

    useEffect(() => {
        fetchDashboardData('2024-10-26 01:15:00', '2025-10-26 05:15:00', 10, 0, params.id);
    }, [fetchDashboardData, params.id]);
    useEffect(() => {
        if (dashboardData) {
            console.log('Dashboard Data:', dashboardData.orders[0]);
        }
    }, [dashboardData]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;


    const order: Order | undefined = dashboardData.orders[0];

    return (
            <>
            <Title className='h3 p-[10px_0px]'>Order No. {order?.order_code}</Title>
            <Tabs defaultValue={'orders'}>
                <Tabs.List>
                    <Tabs.Tab value={'orders'}>Order List</Tabs.Tab>
                    <Tabs.Tab value={'document'}>Document</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value={'orders'}>
                    <Summary order= {order} />
                </Tabs.Panel>
                {/* <Tabs.Panel value={'document'}>
                    <DocumentTable data={dashboardData} />
                </Tabs.Panel> */}
            </Tabs>
            </>
    );
}
