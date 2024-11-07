"use client";
import React, { useEffect } from 'react';
import useDashboardStore from '@/store/order/getOrder';

// Define TypeScript interfaces based on the data structure
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

interface DashboardData {
    orders: Order[];
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


    // Assuming single order for simplicity
    const order: Order | undefined = dashboardData.orders[0];

    return (
        <div className="p-4 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Pickup Address */}
                    <div>
                        <h4 className="font-semibold text-gray-700">Pickup Address</h4>
                        <p><strong>{order?.euroSenderOrder.shipment.pickupContact.name}</strong></p>
                        <p>{order?.euroSenderOrder.shipment.pickupContact.phone}</p>
                        <p>{order?.euroSenderOrder.shipment.pickupAddress.street}</p>
                        <p>{order?.euroSenderOrder.shipment.pickupAddress.city}, {order?.euroSenderOrder.shipment.pickupAddress.zip}</p>
                    </div>

                    {/* Delivery Address */}
                    <div>
                        <h4 className="font-semibold text-gray-700">Delivery Address</h4>
                        <p><strong>{order?.euroSenderOrder.shipment.deliveryContact.name}</strong></p>
                        <p>{order?.euroSenderOrder.shipment.deliveryContact.phone}</p>
                        <p>{order?.euroSenderOrder.shipment.deliveryAddress.street}</p>
                        <p>{order?.euroSenderOrder.shipment.deliveryAddress.city}, {order?.euroSenderOrder.shipment.deliveryAddress.zip}</p>
                    </div>

                    {/* Additional Info */}
                    <div>
                        <h4 className="font-semibold text-gray-700">Email</h4>
                        <p>{order?.email}</p>
                        <h4 className="font-semibold text-gray-700 mt-4">Pick-up Date</h4>
                        <p>{order?.euroSenderOrder.shipment.pickupDate}</p>
                        <h4 className="font-semibold text-gray-700 mt-4">Total Price</h4>
                        <p>€{order?.euroSenderOrder.price.original.gross}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <p><strong>Courier Company:</strong> {order?.euroSenderOrder.courier.shortName}</p>
                    <p><strong>Additional Services:</strong> None</p>
                    <p><strong>Special Notes:</strong> None</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-4 text-left font-semibold">Order Number</th>
                            <th className="p-4 text-left font-semibold">Tracking Number</th>
                            <th className="p-4 text-left font-semibold">Type of Item</th>
                            <th className="p-4 text-left font-semibold">Weight</th>
                            <th className="p-4 text-left font-semibold">Dimensions</th>
                            <th className="p-4 text-left font-semibold">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.euroSenderOrder.parcels.packages.map((pkg, index) => (
                            <tr key={index} className="border-b last:border-none">
                                <td className="p-4">{order?.order_code}</td>
                                <td className="p-4">
                                    <a href={pkg.tracking ?? "#"} className="text-blue-500 hover:underline">
                                        {pkg.parcelId}
                                    </a>
                                </td>
                                <td className="p-4">{pkg.type}</td>
                                <td className="p-4">{pkg.weight} kg</td>
                                <td className="p-4">{pkg.length} x {pkg.width} x {pkg.height} cm</td>
                                <td className="p-4">€{pkg.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
