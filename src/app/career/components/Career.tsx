"use client";
import { Icon } from "@iconify/react";
import { Accordion, Text, Title } from "@mantine/core";
import style from "../../_sections/faq.module.scss";

type FAQType = {
  title: string;
  description: string;
  link:string
};

type FAQSectionProps = {
  className?: string;
};

const faqList: FAQType[] = [
  {
    title: "Frontend Developer",
    description:
      "Frontend Developer Description Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    link:""
  },
];

const CareerSection = ({ className }: FAQSectionProps) => {
  return (
    <article className={`py-14`}>
      <section className="safe-area grid gap-8 justify-items-center">
        <Title order={2} className={`${className || ""}`}>
        Ready to Build the Future with Us?
        </Title>
        <Text className="text-muted">We’re looking for passionate individuals who are ready to innovate and thrive in a supportive environment.</Text>
        <Accordion
          classNames={{ chevron: style.chevron, item: "bg-white" }}
          className="max-w-[1400px] w-full grid"
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

export default CareerSection;
