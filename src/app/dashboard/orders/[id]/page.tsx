'use client';
import React, { useEffect } from 'react';
import { Title, Tabs } from '@mantine/core';
import Summary from './components/summary';
import { DASHBOARD_API } from '@/api/dashboard';
import useAuthStore from '@/store/auth';
import useQuery from '@/hooks/useQuery';
import { redirect } from 'next/navigation';

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
  pickupDate: string | null;
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

interface dashboardDataError {
  status: number;
  isLoading: boolean;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const authStore = useAuthStore();
  const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD, {
    startDate: '2024-10-26 01:15:00',
    endDate: '2025-10-26 05:15:00',
    limit: 10,
    skip: 0,
    orderCode: params.id,
  }) as {
    data: { data: { orders: Order[] } };
    error: dashboardDataError;
    isLoading: boolean;
  };

  useEffect(() => {
    if (DASHBOARD_DATA.error?.status === 500) {
      authStore.logOut();
    }
  }, [DASHBOARD_DATA.error, authStore]);

  const order: Order | undefined = DASHBOARD_DATA.data?.data?.orders[0];

  return (
    <>
      <Title className="h3 p-[10px_0px]">Order No. {order?.order_code}</Title>
      <Tabs defaultValue={'orders'}>
        <Tabs.List>
          <Tabs.Tab value={'orders'}>Order List</Tabs.Tab>
          <Tabs.Tab value={'document'}>Document</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={'orders'}>
          <Summary order={order} loading={DASHBOARD_DATA.isLoading} />
        </Tabs.Panel>
        {/* <Tabs.Panel value={'document'}>
                    <DocumentTable data={dashboardData} />
                </Tabs.Panel> */}
      </Tabs>
    </>
  );
}
