"use client";
import { Anchor, Button, NumberInput, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ShipmentTracker() {
  const [orderId, setOrderId] = useState<string>("");
  const router = useRouter();

  const redirectTrack = (orderId: string) => {
    if (!orderId) return;
    router.push(
      `https://www.dhl.com/de-en/home/tracking/tracking-express.html?submit=1&tracking-id=${orderId}`
    );
  };
  return (
    <div className="h-full rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <Text>Shipment Tracker</Text>
      </div>
      <div className="mt-3">
        <Text className="text-[12px] font-semibold text-muted">
          Enter your order or tracking number
        </Text>
        <TextInput
          onChange={(e) => setOrderId(e.target.value as string)}
          placeholder="Order number / Tracking number"
        />
      </div>
      <div className="my-2 text-right">
        <Button
          onClick={() => redirectTrack(orderId)}
          className="mt-4"
          variant="filled"
          color="rgba(209, 207, 207, 1)"
        >
          Track
        </Button>
      </div>
    </div>
  );
}
