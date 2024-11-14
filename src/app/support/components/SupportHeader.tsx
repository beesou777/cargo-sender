"use client";

import { Title, Text, TextInput, Button } from "@mantine/core";

export default function SupportHeader() {
    return (
        <div className="py-24 px-[10px] text-center text-white grid gap-8 grid-cols-6 safe-area">
            <section className="col-span-6 md:col-span-3">
                <div className="text-left">
                    <Title order={1} className="text-4xl md:text-5xl font-bold">
                        Hello, <br /> how can we help?
                    </Title>
                    <Text size="lg" className="mt-2 opacity-80">
                        Find answers and inspiration on all things Cargosender.
                    </Text>
                </div>

                <div className="mt-6 max-w-md">
                    <TextInput
                        placeholder="Search..."
                        size="lg"
                        classNames={{
                            input: "bg-white text-black rounded-lg px-4 py-3",
                        }}
                    />
                </div>
            </section>
            <div className="mt-8 xl:col-span-2 md:col-span-3 col-span-6 flex flex-wrap gap-4">
                {["Getting Started", "Order Management", "Packaging Guidelines", "Pickup & Delivery", "Shipping Restrictions", "Payment Information", "Booking and Navigation", "Customer Support"].map((label) => (
                    <Button
                        variant="outline"
                        color="white"
                        key={label}
                        className="w-fit text-white border-white rounded-full hover:bg-white hover:text-[#1a1a2e]"
                    >
                        {label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
