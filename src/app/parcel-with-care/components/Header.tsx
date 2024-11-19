"use client";

import { Title, Text, TextInput, Button } from "@mantine/core";
import Image from "next/image";

export default function ParcelCareHeader() {
    return (
        <div className="py-[32px] px-[24px] text-center text-white grid gap-8 grid-cols-6 safe-area">
            <section className="col-span-6 md:col-span-3 self-center md:order-1 order-2">
                <div className="text-left">
                    <Title
                        order={1}
                        className="text-white lg:!text-[54px] font-bold md:text-4xl text-3xl leading-[1.1]"
                    >
                        Deliver Smarter, <br /> Faster, Better
                    </Title>
                    <Text size="sm" className="mt-2">
                        Choose the perfect shipping solution for your needs—affordable, flexible, or lightning-fast. We’ve got you covered with reliable delivery and tracking every step of the way!
                    </Text>
                </div>
                <div className="text-left py-4">
                <Button className="!bg-white !text-black rounded-full !text-[12px] !px-8 !py-3" >Get a Quote</Button>
                </div>
            </section>

            <div className="md:col-span-3 col-span-6 text-left md:order-2 order-1">
                <Image
                width={552}
                height={280}
                src="/assets/images/footer/shipping-options.png"
                alt="shipping-options"
                className="w-full h-full"
                />
            </div>
        </div>
    );
}
