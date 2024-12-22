'use client';

import { Title, Text, TextInput, Button } from '@mantine/core';
import Image from 'next/image';

export default function CareerHeader() {
  return (
    <div className="py-[32px] px-[24px] text-center text-white grid gap-8 grid-cols-6 safe-area">
      <section className="col-span-6 md:col-span-3 self-center md:order-1 order-2">
        <div className="text-left">
          <Title order={1} className="text-white lg:!text-[54px] font-bold md:text-4xl text-3xl leading-[1.1]">
            Working at <br /> Cargosender
          </Title>
          <Text size="sm" className="mt-2">
            Join our team on a mission to revolutionize global logistics, enabling a future where shipping anywhere is
            seamless and efficient.
          </Text>
          <Text size="sm" className="mt-2">
            We’re a global, remote-first team where you can grow your skills, contribute to an impactful product, and
            help shape a trusted, admired business.
          </Text>
        </div>
        <div className="text-left py-4">
          <Button className="!bg-white !text-primary !text-[12px]">See open Roles</Button>
        </div>
      </section>

      <div className="md:col-span-3 col-span-6 text-left md:order-2 order-1">
        <Image
          width={552}
          height={280}
          src="/assets/images/footer/career.webp"
          alt="shipping-options"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
