"use client";
import { Icon } from "@iconify/react";
import { Accordion, Text, Title } from "@mantine/core";
import style from "../../_sections/faq.module.scss";
import Image from "next/image";

type FAQType = {
  title: string;
  description: string;
  link: string;
};

type FAQSectionProps = {
  className?: string;
};

const faqList: FAQType[] = [
  // {
  //   title: "Frontend Developer",
  //   description:
  //     "Frontend Developer Description Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //   link:""
  // },
];

const CareerSection = ({ className }: FAQSectionProps) => {
  return (
    <article>
      <section className="safe-area grid justify-items-center gap-8">
        <Title order={2} className={`${className || ""}`}>
          Ready to Build the Future with Us?
        </Title>
        <Text className="!text-muted">
          We’re looking for passionate individuals who are ready to innovate and
          thrive in a supportive environment.
        </Text>
        <Accordion
          classNames={{ chevron: style.chevron, item: "bg-white" }}
          className="grid w-full max-w-[1400px]"
          chevron={<Icon className="text-lg" icon="ic:outline-plus" />}
        >
          {faqList?.length === 0 ? (
            <div className="text-center">
              <Image
                className="overflow-hidden rounded-lg object-cover"
                src="/assets/icons/footer/no-opening.svg"
                alt="empty"
                width={400}
                height={400}
              />
              <Text className="!text-muted">
                There are no openings at this moment.
              </Text>
            </div>
          ) : (
            faqList?.map((item, index) => {
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
            })
          )}
        </Accordion>
      </section>
    </article>
  );
};

export default CareerSection;
