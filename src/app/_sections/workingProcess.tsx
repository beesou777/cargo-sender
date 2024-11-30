import ProcessCard from "@/components/cards/processCard";
import { IMAGES } from "@/utils/constants";
import { Title } from "@mantine/core";
import { CONTENT } from "./content";


const WorkingProcessSection = () => {
  return (
    <article className="grid item-center justify-items-center py-14 text-white"
    style={
      {
        backgroundImage: "url('/assets/images/working-process/working-process.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(65vh - 4rem)"
      }
    }
    >
      <section className="safe-area grid gap-10 justify-items-center">
        <Title order={2} size={"h1"} className="font-normal">
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
