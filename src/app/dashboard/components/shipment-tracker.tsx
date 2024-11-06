"use client";
import { Anchor, Text, TextInput } from "@mantine/core";

export default function ShipmentTracker() {
    return (
        <div className="p-4 bg-white rounded-lg h-full">
            <div className="flex justify-between items-center">
            <Text>Shipment Tracker</Text>
            <Text>Shipment Tracker</Text>
            </div>
            <div className="mt-3">
                <Text>Enter your order or tracking number</Text>
                <TextInput placeholder="Enter your order or tracking number" />
            </div>
            <div className="text-right my-2">
                <Anchor className="bg-gray-300 py-2 px-4 rounded" component="button">Track</Anchor>
            </div>
        </div>
    )
}