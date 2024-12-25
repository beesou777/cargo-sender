"use client";
import { Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

import { CONTENT } from "./content";
import { IMAGES } from "@/utils/constants";
import ReviewCard from "@/components/cards/reviewCard";

const ReviewsSections = () => {
  const sm = useMediaQuery("(min-width: 640px)");
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  const xl = useMediaQuery("(min-width: 1280px)");

  // Determine the number of slides per view based on screen size
  const slidesToShow = xl ? 3 : lg ? 3 : md ? 2 : sm ? 1 : 1;
  const slideSize = sm ? (96 / slidesToShow).toFixed(1) : "100";

  return (
    <article className="bg-indigo-800 py-8 sm:py-14">
      <section className="safe-area grid justify-items-center gap-6 sm:gap-10">
        <div className="flex w-full items-center gap-4 sm:gap-8">
          <div className="h-[1px] flex-1 bg-white opacity-30 sm:h-[2px]"></div>
          <Title
            order={2}
            className="text-center text-lg font-normal text-white sm:text-xl md:text-2xl"
          >
            Trusted by People Like You
          </Title>
          <div className="h-[1px] flex-1 bg-white opacity-30 sm:h-[2px]"></div>
        </div>
        <div className="block w-full overflow-x-hidden">
          <Carousel
            slideSize={`${slideSize}%`}
            height={sm ? 400 : 300}
            slideGap="md"
            align="start"
            loop
            withControls={false}
            styles={{
              controls: { fontSize: "1rem", color: "white" },
              control: {
                width: 40,
                height: 40,
                borderRadius: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              },
              indicator: { width: 8, height: 8 },
            }}
          >
            {CONTENT.TESTIMONIALS.map((testimonial, index) => (
              <Carousel.Slide
                key={`${testimonial.title}-${index}`}
                className="min-h-[300px] sm:min-h-[400px]"
              >
                <ReviewCard
                  stars={4.5}
                  title={testimonial.title}
                  name={testimonial.name}
                  image={IMAGES.WORKING_PROCESS[0]}
                  review={testimonial.description}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </section>
    </article>
  );
};

export default ReviewsSections;
