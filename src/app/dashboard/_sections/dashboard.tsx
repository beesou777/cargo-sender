import { Table, TableData, Text, Title } from "@mantine/core";
import React from "react";
import RecentOrders from "../components/recent-orders";
import ShipmentTracker from "../components/shipment-tracker";
import Documents from "../components/documents";
import CheckDiamentionWeight from "../components/check-diamention-weight";


const DashboardSection = () => {
    return (
        <div className="dash-section !m-0">
            <Title className='h3 p-[10px_0px]'>Dashboard</Title>
            <article className="grid gap-4 xl:grid-cols-2">
                <section className="grid gap-4 grid-cols-2">
                    <div className="grid gap-4">
                        <div className="section-block">
                            <Text>Total Orders</Text>
                            <Title>268</Title>
                            <Text>See all</Text>
                        </div>
                        <div className="section-block">
                            <Text>Pickup Soon</Text>
                            <Title>2</Title>
                            <Text>See all</Text>
                        </div>
                    </div>
                    <div className="section-block">
                        <Text>Orders</Text>
                    </div>
                </section>
                <section className="section-block">
                    <Text>Documents</Text>
                </section>
            </article>
            <div className="grid grid-cols-6 gap-4">
                <div className="col col-span-4">
                <ShipmentTracker />
                </div>
                <div className="col-span-2">
                <Documents />
                </div>
            </div>
            <RecentOrders />
            <CheckDiamentionWeight />
        </div>
    );
};

export default DashboardSection;
