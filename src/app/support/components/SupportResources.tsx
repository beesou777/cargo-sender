"use client";

import { Text, Card, Group, Stack } from "@mantine/core";
import {
    IconArrowRight, IconPackage, IconTruck, IconCalendar, IconCreditCard, IconClipboardList,
    IconHeadset,
    IconArrowForwardUp,
    IconHandFinger,
    IconChevronRight
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";


export default function SupportResources() {
    const router = useRouter()
    const resources = [
        { title: "Getting Started", icon: <IconHandFinger size={24} />, link: "" },
        { title: "What is Cargosender", icon: <IconArrowForwardUp size={24} />, link: "" },
        { title: "Pickup & Delivery", icon: <IconTruck size={24} />, link: "" },
        { title: "Customer Support", icon: <IconHeadset size={24} />, link: "" },
        { title: "Booking & Navigating", icon: <IconCalendar size={24} />, link: "" },
        { title: "Payment Options", icon: <IconCreditCard size={24} />, link: "" },
        { title: "Orders and Tracking", icon: <IconClipboardList size={24} />, link: "" },
        { title: "Packaging Guidelines", icon: <IconPackage size={24} />, link: "" },
    ];

    return (
        <div className="py-8 px-[24px] bg-white safe-area">
            <Text className="text-2xl font-bold mb-6">Browse Resources</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                    <Card
                        onClick={() => router.push(resource.link)}
                        key={resource.title}
                        className="flex flex-row  items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        withBorder
                    >
                        <Group>
                            <div className="bg-yellow-500 h-[42px] w-[42px] flex justify-center items-center p-2 rounded-full text-gray-700">
                                {resource.icon}
                            </div>
                            <Stack>
                                <Text className="font-semibold text-gray-900">{resource.title}</Text>
                            </Stack>
                        </Group>
                        <IconChevronRight size={20} className="ml-auto text-gray-500" />
                    </Card>
                ))}
            </div>
        </div>
    );
}
