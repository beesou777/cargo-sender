"use client";
import { Anchor, Button, NumberInput, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ShipmentTracker() {
    const [orderId, setOrderId] = useState<string>("");
    const router = useRouter();

    const redirectTrack = (orderId: string) => {
        if (!orderId) return;
        router.push(`https://www.dhl.com/de-en/home/tracking/tracking-express.html?submit=1&tracking-id=${orderId}`);
    }
    return (
        <div className="p-4 bg-white rounded-lg h-full">
            <div className="flex justify-between items-center">
            <Text>Shipment Tracker</Text>
            </div>
            <div className="mt-3">
                <Text className="text-muted font-semibold text-[12px]">Enter your order or tracking number</Text>
                <TextInput onChange={(e) => setOrderId(e.target.value as string)} placeholder="Order number / Tracking number" />
            </div>
            <div className="text-right my-2">
                <Button onClick={() =>redirectTrack(orderId) } className='mt-4' variant="filled" color="rgba(209, 207, 207, 1)">Track</Button>
            </div>
        </div>
    )
}