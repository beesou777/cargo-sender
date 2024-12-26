'use client';

import { Title, Text, TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function SupportHeader() {
  return (
    <div className="py-24 px-[24px] text-center text-white grid gap-8 grid-cols-6 safe-area">
      <section className="col-span-6 xl:col-span-4 md:col-span-3  self-center">
        <div className="text-left">
          <Title order={1} className="text-white lg:!text-[54px] font-bold md:text-4xl text-3xl leading-[1.1]">
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
              input: 'bg-white text-black rounded-lg px-4 py-3',
            }}
          />
        </div>
      </section>

      <div className="mt-8 xl:col-span-2 md:col-span-3 col-span-6 flex flex-wrap gap-4 justify-left">
        {[
          'Getting Started',
          'Order Management',
          'Packaging Guidelines',
          'Pickup & Delivery',
          'Shipping Restrictions',
          'Payment Information',
          'Booking and Navigation',
          'Customer Support',
        ].map((label) => (
          <Button
            variant="outline"
            color="white"
            key={label}
            className="w-fit md:text-[14px] !text-[12px] md:px-8 !px-2 text-white border-white !rounded-full !bg-[rgba(255,_255,_255,_0.07)] hover:!bg-[rgba(255,_255,_255,_0.04)] hover:text-[#1a1a2e]"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
