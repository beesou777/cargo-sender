import ReviewCard from "@/components/cards/reviewCard";
import { Title } from "@mantine/core";

const workingProcessCompany = [
  "/assets/images/working-process/1.png",
  "/assets/images/working-process/2.png",
  "/assets/images/working-process/3.png",
  "/assets/images/working-process/4.png",
];

const ReviewsSections = () => {
  return (
    <>
      <article className="bg-indigo-800 py-14">
        <section className="safe-area grid gap-10 justify-items-center">
          <div className="flex gap-8 items-center w-full">
            <div className="flex-1 h-[2px] bg-white opacity-30"></div>
            <Title order={2} className="font-normal text-center text-white">
              See What People Say
            </Title>
            <div className="flex-1 h-[2px] bg-white opacity-30"></div>
          </div>
          <div className="grid-wrap gap-8">
            {[1, 2, 3, 4].map((item, index) => {
              return (
                <ReviewCard
                  key={item + index}
                  stars={4.5}
                  name="Ramesh Prasai"
                  image={workingProcessCompany[0]}
                  review="Our Step #1 on collecting the items from your door place"
                />
              );
            })}
          </div>
        </section>
      </article>
    </>
  );
};

export default ReviewsSections;
