"use clinet";
import { Title, Text } from "@mantine/core";

export default function ContactHeader() {
  return (
    <div className="safe-area p-[6rem_24px]">
      <Title className="text-3xl font-bold text-white md:text-4xl lg:!text-[54px]">
        Get in touch
      </Title>
      <Text className="!text-white">
        Need help? We’re here for you 24/7. Get in touch with our expert team
      </Text>
    </div>
  );
}
