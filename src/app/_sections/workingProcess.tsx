import ProcessCard from "@/components/cards/processCard";
import { IMAGES } from "@/utils/constants";
import { Title } from "@mantine/core";
import Image from "next/image";
import { CONTENT } from "./content";

const companyImagesPath = [
  "/assets/icons/trusted-companies/Dana2x.svg",
  "/assets/icons/trusted-companies/Yazaki2x.svg",
  "/assets/icons/trusted-companies/Magna2x.svg",
  "/assets/icons/trusted-companies/Izipizi2x.svg",
  "/assets/icons/trusted-companies/Carestream2x.svg",
];

const WorkingProcessSection = () => {
  return (
    <article className="safe-area grid item-center justify-items-center py-14">
      <div className="w-full rounded-xl relative -top-24 flex flex-col gap-8 items-center bg-gray-200 p-6 pt-12">
        <Title order={3}>Business that have trusted CargoSender</Title>
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-12 lg:flex justify-around px-12">
          {companyImagesPath.map((path, index) => (
            <Image
              className="object-contain cursor-none"
              key={path}
              width={105}
              height={100}
              src={path}
              alt={`trusted-company-${index + 1}`}
            />
          ))}
        </div>
      </div>
      <section className="grid gap-10 justify-items-center">
        <Title order={2} className="font-normal">
          Our Working Process
        </Title>
        <div className="grid-wrap gap-8">
          {
            CONTENT.WORKING_PROCESS.map((process, index) => (
              <ProcessCard
                key={process.title}
                index={index + 1}
                image={IMAGES.WORKING_PROCESS[index]}
                title={process.title}
                text={process.description}

              />
            ))
          }
        </div>
      </section>
    </article>
  );
};

export default WorkingProcessSection;
