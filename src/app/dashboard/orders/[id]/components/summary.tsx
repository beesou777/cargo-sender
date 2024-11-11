"use client";

import SkeletanTable from "@/components/skeletan/table";
import useDashboardStore from "@/store/order/getOrder";
import { useEffect } from "react";
import { Skeleton, Text } from "@mantine/core";
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

export default function Summary({ order, loading }: { order: Order, loading: boolean }) {
    console.log(loading)
    return (
        <div className="p-4 space-y-6">
            <div className="space-y-4">
                <article>
                    {
                        loading ? (
                            <section className="grid md:grid-cols-3 grid-cols-1 gap-4">
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
                                <div className="section-block flex flex-col gap-3">
                                    <Skeleton height={20} width={100} />
                                    <Skeleton height={40} width={40} />
                                    <Skeleton height={20} width={70} />
                                </div>
                            </section>
                        ) : (
                            <section className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                <div className="section-block">
                                    <Text className="my-0 font-semibold text-muted">Pickup Address</Text>
                                    <Text><strong>{order?.euroSenderOrder.shipment.pickupContact.name}</strong></Text>
                                    <Text>{order?.euroSenderOrder.shipment.pickupContact.phone}</Text>
                                    <Text>{order?.euroSenderOrder.shipment.pickupAddress.street}</Text>
                                    <Text>{order?.euroSenderOrder.shipment.pickupAddress.city}, {order?.euroSenderOrder.shipment.pickupAddress.zip}</Text>
                                </div>
                                <div className="section-block">
                                    <Text className="font-semibold text-muted my-0">Delivery Address</Text>
                                    <Text><strong>{order?.euroSenderOrder.shipment.deliveryContact.name}</strong></Text>
                                    <Text>{order?.euroSenderOrder.shipment.deliveryContact.phone}</Text>
                                    <Text>{order?.euroSenderOrder.shipment.deliveryAddress.street}</Text>
                                    <Text>{order?.euroSenderOrder.shipment.deliveryAddress.city}, {order?.euroSenderOrder.shipment.deliveryAddress.zip}</Text>
                                </div>
                                <div className="section-block">
                                    <Text className="font-semibold text-muted my-0">Email</Text>
                                    <Text>{order?.email}</Text>
                                    <Text className="font-semibold text-muted my-0">Pick-up Date</Text>
                                    <Text>{order?.euroSenderOrder.shipment.pickupDate}</Text>
                                    <Text className="font-semibold text-muted my-0">Total Price</Text>
                                    <Text>€{order?.euroSenderOrder.price.original.gross}</Text>
                                </div>
                            </section>
                        )
                    }
                </article>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-lg">
                    <p><strong>Courier Company:</strong> {order?.euroSenderOrder.courier.shortName}</p>
                    <p><strong>Additional Services:</strong> None</p>
                    <p><strong>Special Notes:</strong> None</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-muted">
                            <th className="p-4 text-left font-semibold">Order Number</th>
                            <th className="p-4 text-left font-semibold">Tracking Number</th>
                            <th className="p-4 text-left font-semibold">Type of Item</th>
                            <th className="p-4 text-left font-semibold">Weight</th>
                            <th className="p-4 text-left font-semibold">Dimensions</th>
                            <th className="p-4 text-left font-semibold">Value</th>
                        </tr>
                    </thead>
                    {
                        loading ? (
                            <SkeletanTable count={2} rows={6} />
                        ) : (
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
                        )
                    }
                </table>
            </div>
        </div>
    );
}