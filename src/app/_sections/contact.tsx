import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Text, Title } from "@mantine/core";
import Image from "next/image";

const ContactSection = () => {
  return (
    <article className="py-14">
      <div className="safe-area flex rounded-lg bg-[url(/assets/images/contact-support-bg.jpg)] bg-cover overflow-hidden">
        <div className="relative w-full max-w-[45%] h-[300px]">
          <Image
            className="object-cover"
            src="/assets/images/contact-support.jpg"
            alt="contact-image"
            fill
          />
        </div>
        <div className="p-14 flex flex-col gap-4 items-start ">
          <Title order={2}>Save on Worldwide shipping with CargoSender</Title>
          <Text className="text-sm text-gray-600">
            Get started now, send an item.
          </Text>
          <div className="flex mt-4 gap-4">
            <Button rightSection={<Icon icon="ph:arrow-right-bold" />}>
              Get a quote
            </Button>
            <Button
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
