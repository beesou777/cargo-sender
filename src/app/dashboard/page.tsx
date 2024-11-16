"use client";
import React, { useEffect } from 'react'
import DashboardSection from './_sections/dashboard';
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';
import { redirect } from 'next/navigation'
import useAuthStore from '@/store/auth';
import LoginPage from '@/components/login/googleLogin';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

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


interface dashboardDataError{
    status: number,
    isLoading: boolean
}

const DashboardPage = () => {
  const [loginDrawerOpened, { toggle: toggleLoginDrawer }] = useDisclosure(false);
    const authStore = useAuthStore()
        const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD,{
            startDate:'2024-10-26 01:15:00',
            endDate: '2025-10-26 05:15:00',
            limit: 10,
            skip: 0,
        }) as {data : {data: {orders: Order[]}}, error: dashboardDataError, isLoading: boolean}
        useEffect(() => {
            if (DASHBOARD_DATA.error?.status === 500) {
                authStore.logOut();
                <LoginPage opened={loginDrawerOpened} onClose={toggleLoginDrawer} />
            }
        }, [DASHBOARD_DATA.error, authStore]);
    
        if (!authStore.isAuthenticated) {
            notifications.show({
                title: 'Unauthorized',
                message: 'You are not authorized to access this page.',
                color: 'red',
            })
            redirect('/');
        }
    return (
        <main className='bg-backdrop'>
            <DashboardSection data={DASHBOARD_DATA.data} loading={DASHBOARD_DATA.isLoading} />
        </main>
    )
}

export default DashboardPage