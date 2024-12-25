"use client";

import { Title, Text, TextInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SupportHeader() {
  return (
    <div className="safe-area grid grid-cols-6 gap-8 px-[24px] py-24 text-center text-white">
      <section className="col-span-6 self-center md:col-span-3 xl:col-span-4">
        <div className="text-left">
          <Title
            order={1}
            className="text-3xl font-bold leading-[1.1] text-white md:text-4xl lg:!text-[54px]"
          >
            Hello, <br /> how can we help?
          </Title>
          <Text size="lg" className="mt-2">
            Find answers and inspiration on all things Cargosender.
          </Text>
        </div>

        <div className="mt-6 max-w-md">
          <TextInput
            placeholder="Search..."
            size="lg"
            leftSection={<IconSearch />}
            classNames={{
              input: "bg-white text-black rounded-lg px-4 py-3",
            }}
          />
        </div>
      </section>

      <div className="justify-left col-span-6 mt-8 flex flex-wrap gap-4 md:col-span-3 xl:col-span-2">
        {[
          "Getting Started",
          "Order Management",
          "Packaging Guidelines",
          "Pickup & Delivery",
          "Shipping Restrictions",
          "Payment Information",
          "Booking and Navigation",
          "Customer Support",
        ].map((label) => (
          <Button
            variant="outline"
            color="white"
            key={label}
            className="w-fit !rounded-full border-white !bg-[rgba(255,_255,_255,_0.07)] !px-2 !text-[12px] text-white hover:!bg-[rgba(255,_255,_255,_0.04)] hover:text-[#1a1a2e] md:px-8 md:text-[14px]"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
