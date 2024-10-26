"use client";
import { Icon } from "@iconify/react";
import { Accordion, Text, Title } from "@mantine/core";
import style from "./faq.module.scss";

type FAQType = {
  title: string;
  description: string;
};

const faqList: FAQType[] = [
  {
    title: "What is BetterSender?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorum debitis aspernatur repudiandae magnam totam, ad dolor cumque voluptates laboriosam vero deleniti ex atque! Exercitationem?",
  },
  // {
  //   title: "What is BetterSender?",
  //   description:
  //     "CLEANILO is an experienced home and office service provider with a difference. We offer a variety of high-quality services with very gentle service providers in your area at the best price. The satisfaction of our customers is particularly important to us. You can also conveniently make an appointment with us at short notice.",
  // },
  // {
  //   title: "What is BetterSender?",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolorum debitis aspernatur repudiandae magnam totam, ad dolor cumque voluptates laboriosam vero deleniti ex atque! Exercitationem?",
  // },
];

const FAQSection = () => {
  return (
    <article className="py-14">
      <section className="safe-area grid gap-8 justify-items-center">
        <Title order={2} className="font-normal">
          Frequently Asked Questions
        </Title>
        <Accordion
          classNames={{ chevron: style.chevron, item: "bg-white" }}
          className="max-w-3xl w-full grid"
          chevron={<Icon className="text-lg" icon="ic:outline-plus" />}
        >
          {faqList?.map((item, index) => {
            return (
              <Accordion.Item
                className="w-full mb-4 rounded-lg border-default bg-white"
                key={item.title}
                value={item.title + index}
              >
                <Accordion.Control className=" w-full px-4 py-2">
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
