import { Text } from "@mantine/core";
import Image from "next/image";

const POWERED_BY = [
  "/assets/icons/powered-by/ergo.svg",
  "/assets/icons/powered-by/FRC-2x.svg",
  "/assets/icons/powered-by/post.svg",
  "/assets/icons/powered-by/proSieben.svg",
];

export const SUPPORTED_BY = [
  "/assets/icons/supported-by/American_Express.svg",
  "/assets/icons/supported-by/apple.svg",
  "/assets/icons/supported-by/google.svg",
  "/assets/icons/supported-by/Mastercard_branded.svg",
  "/assets/icons/supported-by/PayPal_vertical.svg",
  "/assets/icons/supported-by/visa.svg",
];

const FIND_US = [
  {
    link: "http://facebook.com",
    icon: "/assets/icons/find-us/Facebook.svg",
  },
  {
    link: "http://instagram.com",
    icon: "/assets/icons/find-us/instagram.svg",
  },
  {
    link: "http://linkedin.com",
    icon: "/assets/icons/find-us/linkedin.svg",
  },
  {
    link: "http://twitter.com",
    icon: "/assets/icons/find-us/twitter.svg",
  },
];

const InfoSection = () => {
  return (
    <article className="grid flex-1 grid-cols-1 flex-wrap justify-between gap-8 px-[40px] py-14 sm:grid-cols-2 md:grid-cols-3 md:px-[60px] lg:grid-cols-4">
      <section className="flex min-w-[30%]">
        <Image
          className="object-contain"
          width={137}
          height={30}
          src="/assets/icons/brand-logo.png"
          alt="find-us"
        />
      </section>
      <section className="grid gap-4">
        <Text className="text-sm !font-bold">Find us at</Text>
        <div className="flex items-center gap-3">
          {FIND_US?.map((item) => (
            <Image
              className="object-contain"
              key={item.link}
              width={40}
              height={40}
              src={item.icon}
              alt="find-us"
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <Text className="text-sm !font-bold">Powered by</Text>
        <div className="flex flex-wrap items-center gap-3">
          {POWERED_BY?.map((path, index) => (
            <Image
              className="object-contain"
              key={path}
              width={70}
              height={40}
              src={path}
              alt={`powered-by-${index}`}
            />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <Text className="text-sm !font-bold">Supported By</Text>
        <div className="flex flex-wrap items-center gap-3">
          {SUPPORTED_BY?.map((path, index) => (
            <Image
              className="object-contain"
              key={path}
              width={40}
              height={40}
              src={path}
              alt={`supported-by-${index}`}
            />
          ))}
        </div>
      </section>
    </article>
  );
};

export default InfoSection;
