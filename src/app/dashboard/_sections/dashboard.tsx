import { Table, Text, Title, Skeleton } from '@mantine/core';
import React from 'react';
import RecentOrders from '../components/recent-orders';
import ShipmentTracker from '../components/shipment-tracker';
import Documents from '../components/documents';
import { BarChart } from '@mantine/charts';
import '@mantine/charts/styles.css';

const DashboardSection = ({ data, loading }: any) => {
  // Safely access data to prevent errors when it's undefined
  const orders = data?.data?.orders || [];
  const totalOrders = data?.data?.orders.length || 0;
  const pickupSoon = data?.data?.pickupSoon || 0;

  const ordersByDate = orders.reduce((acc: Record<string, number>, order: any) => {
    const date = order.created_at.split(' ')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(ordersByDate).map(([date, count]) => ({
    date,
    orders: count,
  }));

  return (
    <div className="dash-section !m-0">
      <Title className="h3 p-[10px_0px]">Dashboard</Title>
      <article className="grid gap-4 xl:grid-cols-2">
        {loading ? (
          <section className="grid-cols-2">
            <div className="grid gap-4 w-full h-full">
              <div className="section-block flex flex-col gap-3">
                <Skeleton height={20} width={100} />
                <Skeleton height={40} width={40} />
                <Skeleton height={20} width={70} />
              </div>
              <div className="section-block flex flex-col gap-3">
                <Skeleton height={20} width={100} />
                <Skeleton height={40} width={40} />
                <Skeleton height={20} width={70} />
              </div>
            </div>
          </section>
        ) : (
          <section className="grid-cols-2">
            <div className="grid grid-cols-2 gap-4 w-full h-full">
              <div className="section-block md:col-span-2 col-span-1">
                <Text>Total Orders</Text>
                <Title>{totalOrders}</Title>
                <Text>See all</Text>
              </div>
              <div className="section-block md:col-span-2 col-span-1">
                <Text>Pickup Soon</Text>
                <Title>{pickupSoon}</Title>
                <Text>See all</Text>
              </div>
            </div>
          </section>
        )}

        {loading ? (
          <section className="section-block flex gap-4 flex-col">
            <Skeleton height={20} width={100} />
            <div className="flex gap-4 justify-between">
              <Skeleton height={200} width="100%" />
              <Skeleton height={200} width="100%" />
            </div>
          </section>
        ) : (
          <section className="section-block">
            <Text>Orders by Date</Text>
            {chartData.length > 0 ? (
              <BarChart h={300} data={chartData} dataKey="date" series={[{ name: 'orders', color: 'blue' }]} />
            ) : (
              <Text>No data available</Text>
            )}
          </section>
        )}
      </article>
      <div className="grid grid-cols-6 gap-4">
        <div className="col col-span-6 xl:col-span-4">
          <ShipmentTracker />
        </div>
        <div className="xl:col-span-2 col-span-6">
          <Documents />
        </div>
      </div>
      <RecentOrders data={data?.data?.orders || []} loading={loading} /> {/* Pass orders directly to RecentOrders */}
    </div>
  );
};

export default DashboardSection;
