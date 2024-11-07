"use client";

import useDashboardStore from "@/store/order/getOrder";
import { useEffect } from "react";

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

export default function Summary({ order }: { order: Order }) {
  return (
     <div className="p-4 space-y-6">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className='bg-white p-4 rounded-lg'>
                        <h4 className="my-0 font-semibold text-gray-700">Pickup Address</h4>
                        <p><strong>{order?.euroSenderOrder.shipment.pickupContact.name}</strong></p>
                        <p>{order?.euroSenderOrder.shipment.pickupContact.phone}</p>
                        <p>{order?.euroSenderOrder.shipment.pickupAddress.street}</p>
                        <p>{order?.euroSenderOrder.shipment.pickupAddress.city}, {order?.euroSenderOrder.shipment.pickupAddress.zip}</p>
                    </div>

                    <div className='bg-white p-6 rounded-lg'>
                        <h4 className="font-semibold text-gray-700 my-0">Delivery Address</h4>
                        <p><strong>{order?.euroSenderOrder.shipment.deliveryContact.name}</strong></p>
                        <p>{order?.euroSenderOrder.shipment.deliveryContact.phone}</p>
                        <p>{order?.euroSenderOrder.shipment.deliveryAddress.street}</p>
                        <p>{order?.euroSenderOrder.shipment.deliveryAddress.city}, {order?.euroSenderOrder.shipment.deliveryAddress.zip}</p>
                    </div>

                    <div className='bg-white p-6 rounded-lg'>
                        <h4 className="font-semibold text-gray-700 my-0">Email</h4>
                        <p>{order?.email}</p>
                        <h4 className="font-semibold text-gray-700 my-0">Pick-up Date</h4>
                        <p>{order?.euroSenderOrder.shipment.pickupDate}</p>
                        <h4 className="font-semibold text-gray-700 my-0">Total Price</h4>
                        <p>€{order?.euroSenderOrder.price.original.gross}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-lg">
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