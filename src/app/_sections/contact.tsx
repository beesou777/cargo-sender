"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ContactSection = () => {
  const router = useRouter()
  return (
    <article className="py-14">
      <div className="safe-area grid grid-cols-6 gap-4 relative"
      style={{
        backgroundImage: "url('/assets/images/contact-support-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }}  
      >
        <div className="col-span-6 md:col-span-3">
          <div className="relative w-full h-[300px] md:h-[350px] max-w-full">
            <Image
              className="object-cover w-full h-full rounded-md"
              src="/assets/images/contact-support.jpg"
              alt="contact-image"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, (min-width: 1024px) 600px"
            />
          </div>
        </div>
      <div className="md:col-span-3 col-span-6 flex flex-col gap-4 items-start justify-center md:p-12 py-4"
      >
        <Title order={2}>Save on Worldwide <br /> shipping with <br /> CargoSender</Title>
        <Text className="text-sm text-gray-600">
          Get started now, send an item.
        </Text>
        <div className="flex flex-row mt-4 gap-4 w-full md:w-[60%]">
          <Button onClick={() => router.push("/cargo-quote")} className="w-full" rightSection={<Icon icon="ph:arrow-right-bold" />}>
            Get a quote
          </Button>
          <Button
            onClick={() => router.push("/contact-us")}
            className="w-full"
            variant="outline"
            leftSection={<Icon icon="ri:headphone-line" />}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
    </article >
  );
};

export default ContactSection;
