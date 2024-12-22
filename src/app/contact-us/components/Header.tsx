'use clinet';
import { Title, Text } from '@mantine/core';

export default function ContactHeader() {
  return (
    <div className="p-[6rem_24px] safe-area">
      <Title className="text-white lg:!text-[54px] font-bold md:text-4xl text-3xl">Get in touch</Title>
      <Text className="!text-white">Need help? We’re here for you 24/7. Get in touch with our expert team</Text>
    </div>
  );
}
