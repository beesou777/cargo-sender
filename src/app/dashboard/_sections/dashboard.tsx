import { Table, TableData, Text, Title } from "@mantine/core";
import React from "react";

const tableData: TableData = {
    head: ["Element position", "Atomic mass", "Symbol", "Element name"],
    body: [
        ["Order ID", "User Name", "2024 - 10 - 10", "EUR: 23"],

        ["Order ID", "User Name", "2024-10 - 10", "EUR: 23"],
    ],
};

const DashboardSection = () => {
    return (
        <div className="dash-section">
            <Title>Dashboard</Title>
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
            <article className="section-block">
                <Table withRowBorders withColumnBorders data={tableData} />
            </article>
        </div>
    );
};

export default DashboardSection;
