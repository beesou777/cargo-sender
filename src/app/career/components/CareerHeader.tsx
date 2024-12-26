"use client";

import { Title, Text, TextInput, Button } from "@mantine/core";
import Image from "next/image";

export default function CareerHeader() {
  return (
    <div className="safe-area grid grid-cols-6 gap-8 px-[24px] py-[32px] text-center text-white">
      <section className="order-2 col-span-6 self-center md:order-1 md:col-span-3">
        <div className="text-left">
          <Title
            order={1}
            className="text-3xl font-bold leading-[1.1] text-white md:text-4xl lg:!text-[54px]"
          >
            Working at <br /> Cargosender
          </Title>
          <Text size="sm" className="mt-2">
            Join our team on a mission to revolutionize global logistics,
            enabling a future where shipping anywhere is seamless and efficient.
          </Text>
          <Text size="sm" className="mt-2">
            We’re a global, remote-first team where you can grow your skills,
            contribute to an impactful product, and help shape a trusted,
            admired business.
          </Text>
        </div>
        <div className="py-4 text-left">
          <Button className="!text-primary !bg-white !text-[12px]">
            See open Roles
          </Button>
        </div>
      </section>

      <div className="order-1 col-span-6 text-left md:order-2 md:col-span-3">
        <Image
          width={552}
          height={280}
          src="/assets/images/footer/career.webp"
          alt="shipping-options"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
