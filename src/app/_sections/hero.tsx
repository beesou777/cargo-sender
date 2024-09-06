"use client";
import ProcessCard from "@/components/cards/processCard";
import RadioButtonContainer from "@/components/inputs/buttonRadio";
import { Icon } from "@iconify/react";
import { Button, Popover, Select, Text, Title } from "@mantine/core";
import Image from "next/image";

const companyImagesPath = [
  "/assets/icons/trusted-companies/Dana2x.svg",
  "/assets/icons/trusted-companies/Yazaki2x.svg",
  "/assets/icons/trusted-companies/Magna2x.svg",
  "/assets/icons/trusted-companies/Izipizi2x.svg",
  "/assets/icons/trusted-companies/Carestream2x.svg",
];

const workingProcessCompany = [
  "/assets/images/working-process/1.png",
  "/assets/images/working-process/2.png",
  "/assets/images/working-process/3.png",
  "/assets/images/working-process/4.png",
];

const HeroSection = () => {
  return (
    <>
      <article>
        <div className="safe-area grid grid-cols-2 align-middle gap-4 bg-gray-100 min-h-[calc(100vh-3rem)]">
          <div className="bg-blue-100 flex flex-col align-top">
            <div className="with-icon">
              Rate 4.8/5 on
              <Icon className="text-green-600" icon="simple-icons:trustpilot" />
              Trustpilot
            </div>
            <Title className="text-6xl">
              Save on Global shipping with BetterSender
            </Title>
            <div className="grid">
              <li>Easy Ordering</li>
              <li>Trusted Carriers</li>
              <li>Same day response</li>
            </div>
          </div>
          <div className="bg-blue-100">
            <form className="bg-white rounded-2xl p-8 m-4 grid gap-6" action="">
              <section className="grid gap-3">
                <Text className="font-bold">Collect From</Text>
                <div className="flex gap-4">
                  <Select className="w-2/6"></Select>
                  <Select className="w-4/6" searchable></Select>
                </div>
              </section>
              <section className="grid gap-3">
                <Text className="font-bold">Delivery To</Text>
                <div className="flex gap-4">
                  <Select className="w-2/6"></Select>
                  <Select className="w-4/6" searchable></Select>
                </div>
              </section>

              <section className="grid gap-3">
                <div className="flex justify-between items-center">
                  <Text className="font-bold">Choose a service</Text>
                  <Popover shadow="md">
                    <Popover.Target>
                      <Icon
                        className="text-xl text-gray-500"
                        icon="mdi:about-circle-outline"
                      />
                    </Popover.Target>
                    <Popover.Dropdown>
                      Lorem ipsum dolor sit amet.
                    </Popover.Dropdown>
                  </Popover>
                </div>
                <RadioButtonContainer
                  options={[
                    { label: "Documents", value: "documents" },
                    { label: "Box", value: "box" },
                    { label: "Pallet", value: "pallet" },
                  ]}
                />
              </section>
              <Button size="lg" color="yellow" className="text-black mt-4">
                Get a quote
              </Button>
            </form>
          </div>
        </div>
      </article>
      <article className="grid item-center justify-items-center">
        <div className="w-auto rounded-xl relative -top-10 flex flex-col gap-3 items-center bg-gray-50 pt-10 pb-4 px-32">
          <Title order={3}>Business that have trusted bettersender</Title>
          <div className="flex gap-20 flex-wrap">
            {companyImagesPath.map((path, index) => (
              <Image
                className="object-contain"
                key={path}
                width={105}
                height={100}
                src={path}
                alt={`trusted-company-${index + 1}`}
              />
            ))}
          </div>
        </div>
        <section className="safe-area grid gap-4 justify-items-center">
          <Title order={2} className="font-normal">
            Our Working Process
          </Title>
          <div className="flex gap-8">
            <ProcessCard
              index={1}
              image={workingProcessCompany[0]}
              text="Our Step #1 on collecting the items from your door place"
            />
            <ProcessCard
              index={2}
              image={workingProcessCompany[0]}
              text="Our Step #1 on collecting the items from your door place"
            />
            <ProcessCard
              index={3}
              image={workingProcessCompany[0]}
              text="Our Step #1 on collecting the items from your door place"
            />
            <ProcessCard
              index={4}
              image={workingProcessCompany[0]}
              text="Our Step #1 on collecting the items from your door place"
            />
          </div>
        </section>
      </article>
    </>
  );
};

export default HeroSection;
