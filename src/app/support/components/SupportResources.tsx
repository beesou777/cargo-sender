"use client";

import { Text, Card, Group, Stack } from "@mantine/core";
import {
  IconPackage,
  IconTruck,
  IconCalendar,
  IconCreditCard,
  IconClipboardList,
  IconHeadset,
  IconArrowForwardUp,
  IconHandFinger,
  IconChevronRight,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function SupportResources() {
  const router = useRouter();
  const resources = [
    { title: "Getting Started", icon: <IconHandFinger size={24} />, link: "" },
    {
      title: "What is Cargosender",
      icon: <IconArrowForwardUp size={24} />,
      link: "",
    },
    { title: "Pickup & Delivery", icon: <IconTruck size={24} />, link: "" },
    { title: "Customer Support", icon: <IconHeadset size={24} />, link: "" },
    {
      title: "Booking & Navigating",
      icon: <IconCalendar size={24} />,
      link: "",
    },
    { title: "Payment Options", icon: <IconCreditCard size={24} />, link: "" },
    {
      title: "Orders and Tracking",
      icon: <IconClipboardList size={24} />,
      link: "",
    },
    {
      title: "Packaging Guidelines",
      icon: <IconPackage size={24} />,
      link: "",
    },
  ];

  return (
    <div className="safe-area bg-white px-[24px] py-8">
      <h2 className="h2 mb-6 !font-semibold">Browse Resources</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <Card
            onClick={() => router.push(resource.link)}
            key={resource.title}
            className="flex !flex-row !items-center rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md"
            withBorder
          >
            <Group>
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-secondary p-2 text-gray-700">
                {resource.icon}
              </div>
              <Stack>
                <Text className="font-semibold text-gray-900">
                  {resource.title}
                </Text>
              </Stack>
            </Group>
            <IconChevronRight size={20} className="ml-auto text-gray-500" />
          </Card>
        ))}
      </div>
    </div>
  );
}
