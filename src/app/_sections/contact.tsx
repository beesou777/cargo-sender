"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Text, Title } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ContactSection = () => {
  const router = useRouter();
  return (
    <article className="py-14">
      <div
        className="safe-area relative grid grid-cols-6 gap-4"
        style={{
          backgroundImage: "url('/assets/images/contact-support-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="col-span-6 md:col-span-3">
          <div className="relative h-[300px] w-full max-w-full md:h-[350px]">
            <Image
              className="h-full w-full rounded-md object-cover"
              src="/assets/images/contact-support.jpg"
              alt="contact-image"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, (min-width: 1024px) 600px"
            />
          </div>
        </div>
        <div className="col-span-6 flex flex-col items-start justify-center gap-4 py-4 md:col-span-3 md:p-12">
          <Title order={2}>
            Save on Worldwide <br /> shipping with <br /> CargoSender
          </Title>
          <Text className="text-sm text-gray-600">
            Get started now, send an item.
          </Text>
          <div className="mt-4 flex w-full flex-row gap-4 md:w-[60%]">
            <Button
              onClick={() => router.push("/cargo-quote")}
              className="w-full"
              rightSection={<Icon icon="ph:arrow-right-bold" />}
            >
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
    </article>
  );
};

export default ContactSection;
