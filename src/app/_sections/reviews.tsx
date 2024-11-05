"use client";
import { Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

import { CONTENT } from "./content";
import { IMAGES } from "@/utils/constants";
import ReviewCard from "@/components/cards/reviewCard";


const ReviewsSections = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const md = useMediaQuery('(min-width: 768px)');
  const lg = useMediaQuery('(min-width: 1024px)');
  const xl = useMediaQuery('(min-width: 1280px)');

  // Determine the number of slides per view based on screen size
  const slidesToShow = xl ? 4 : lg ? 3 : md ? 2 : sm ? 1 : 1;
  const slideSize = (96 / slidesToShow).toFixed(1)
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
          <div className="w-full block">

            <Carousel
              slideSize={`${slideSize}%`}
              slideGap="lg"
              align="start"
              loop
              withControls={false}
              withIndicators
            >
              {CONTENT.TESTIMONIALS.map((testimonial) => (
                <Carousel.Slide key={testimonial.title} className="min-h-[400px]">
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
    </>
  );
};

export default ReviewsSections;
