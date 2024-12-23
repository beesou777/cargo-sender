'use client';
import { Tabs, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import useQuery from '@/hooks/useQuery';
import { DASHBOARD_API } from '@/api/dashboard';
import OrderListTable from './component/order-list-table';

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
  status: string;
  parcels: {
    packages: Package[];
  };
}

interface Order {
  order_code: string;
  email: string;
  euroSenderOrder: EuroSenderOrder;
}

interface dashboardDataError {
  status: number;
  isLoading: boolean;
}

interface RowData {
  name: string;
  order_code: string;
  created_at: string;
  payment: {
    amount: number;
  };
  amount: number;
  euroSenderOrder: {
    status: string;
    price: {
      original: {
        gross: number;
      };
    };
    shipment: {
      pickupDate: string;
    };
  };
  price: {
    original: {
      gross: number;
    };
  };
}

const DashboardPage = () => {
  const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD, {
    startDate: '2024-10-26 01:15:00',
    endDate: '2025-10-26 05:15:00',
    limit: 10,
    skip: 0,
  }) as {
    data: { data: { orders: Order[] } };
    error: dashboardDataError;
    isLoading: boolean;
  };

  // useEffect(() => {
  //   if (DASHBOARD_DATA.error?.status === 500) {
  //     authStore.logOut();
  //     openLoginDrawer();
  //   }
  // }, [DASHBOARD_DATA.error, authStore, openLoginDrawer]);

  const ordersData: RowData[] =
    DASHBOARD_DATA.data?.data?.orders.map((order) => ({
      name: order.email,
      order_code: order.order_code,
      created_at: order.euroSenderOrder.shipment.pickupDate,
      payment: {
        amount: order.euroSenderOrder.price.original.gross,
      },
      amount: order.euroSenderOrder.price.original.gross,
      price: {
        original: {
          gross: order.euroSenderOrder.price.original.gross,
        },
      },
      euroSenderOrder: {
        price: order.euroSenderOrder.price,
        shipment: {
          pickupDate: order.euroSenderOrder.shipment.pickupDate,
        },
        status: order.euroSenderOrder.status,
      },
    })) ?? [];

  return (
    <>
      <Title className="h3 p-[10px_0px]">Orders</Title>
      <Tabs defaultValue={'orders'}>
        <Tabs.List>
          <Tabs.Tab value={'orders'}>Order List</Tabs.Tab>
          <Tabs.Tab value={'document'}>Document</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={'orders'}>
          <OrderListTable data={ordersData} loading={DASHBOARD_DATA.isLoading} />
        </Tabs.Panel>
        {/* <Tabs.Panel value={'document'}>
                    <DocumentTable data={dashboardData} />
                </Tabs.Panel> */}
      </Tabs>
    </>
  );
};

export default DashboardPage;
