"use client";
import { Icon } from "@iconify/react";
import { Accordion, Text, Title } from "@mantine/core";
import style from "./faq.module.scss";

type FAQType = {
  title: string;
  description: string;
};

type FAQSectionProps = {
  className?: string;
};

const faqList: FAQType[] = [
  {
    title: "What is CargoSender?",
    description:
      "Cargosender is an easy-to-use online platform that allows you to book courier services for door-to-door delivery of your parcels. You can quickly arrange shipments with reliable courier companies to send packages anywhere with just a few clicks.",
  },
  {
    title: "How long does it take for the parcel delivery?",
    description:
      "Delivery times depend on the destination and service selected. Typically, domestic deliveries take 2-5 business days, while international shipments may take 5-10 business days, depending on the country and customs clearance.",
  },
  {
    title: "How is it safe and which courier company makes the delivery?",
    description:
      "Cargosender partners with trusted courier companies such as DHL, FedEx, and local carriers. All deliveries are insured, and we ensure the security of your parcels by using reliable tracking systems and professional delivery services.",
  },
  {
    title: "What does door-to-door delivery mean?",
    description:
      "Door-to-door delivery means that your parcel is picked up directly from your specified location and delivered to the recipient's address without the need for you to visit a courier office. It's a convenient, hassle-free service.",
  },
];

const FAQSection = ({ className }: FAQSectionProps) => {
  return (
    <article className={`py-14`}>
      <section className="safe-area grid justify-items-center gap-8">
        <Title order={2} className={`${className || ""}`}>
          Frequently Asked Questions
        </Title>
        <Accordion
          classNames={{ chevron: style.chevron, item: "bg-white" }}
          className="grid w-full max-w-3xl"
          chevron={<Icon className="text-lg" icon="ic:outline-plus" />}
        >
          {faqList?.map((item, index) => {
            return (
              <Accordion.Item
                className="border-default mb-4 w-full rounded-lg bg-white"
                key={item.title}
                value={item.title + index}
              >
                <Accordion.Control className="w-full px-4 py-2">
                  <Text className="font-bold">{item.title}</Text>
                </Accordion.Control>
                <Accordion.Panel>{item.description}</Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </section>
    </article>
  );
};

export default FAQSection;
