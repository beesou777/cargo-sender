"use client";

import { Title, Text, Button } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ShippingHeader() {
  const router = useRouter();
  return (
    <div className="safe-area grid grid-cols-6 gap-8 px-[24px] py-[32px] text-center text-white">
      <section className="order-2 col-span-6 self-center md:order-1 md:col-span-3">
        <div className="text-left">
          <Title
            order={1}
            className="text-3xl font-bold leading-[1.1] text-white md:text-4xl lg:!text-[54px]"
          >
            Deliver Smarter, <br /> Faster, Better
          </Title>
          <Text size="sm" className="mt-2">
            Choose the perfect shipping solution for your needs—affordable,
            flexible, or lightning-fast. We’ve got you covered with reliable
            delivery and tracking every step of the way!
          </Text>
        </div>
        <div className="py-4 text-left">
          <Button
            onClick={() => router.push("/cargo-quote")}
            className="rounded-full !bg-white !px-8 !py-3 !text-[12px] !text-black"
          >
            Get a Quote
          </Button>
        </div>
      </section>

      <div className="order-1 col-span-6 text-left md:order-2 md:col-span-3">
        <Image
          width={552}
          height={280}
          src="/assets/images/footer/shipping-options.png"
          alt="shipping-options"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
