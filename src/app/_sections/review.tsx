"use client";
import {
  Card,
  Text,
  Avatar,
  Group,
  Title,
  SimpleGrid,
  Image,
} from "@mantine/core";
import { Carousel as CarouselComponent } from "@mantine/carousel";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

const testimonials = [
  {
    id: 1,
    name: "John",
    avatar: "https://thispersondoesnotexist.com?2",
    quote:
      "The app is really simple and easy to use, saved a lot of time while booking shipments!",
  },
  {
    id: 2,
    name: "Maria",
    avatar: "https://thispersondoesnotexist.com?1",
    quote:
      "Very helpful platform, the support team quickly replied and resolved my issues within 10minutes.",
  },
  {
    id: 3,
    name: "Ali",
    avatar: "https://thispersondoesnotexist.com?3",
    quote: "Simple, fast, and clear instructions—I’ll definitely use it again.",
  },
  {
    id: 4,
    name: "Sophia",
    avatar: "https://thispersondoesnotexist.com?4",
    quote:
      "Good prices, but loading times can improve; still, the prices make up for it. Hope they improve the page loading time really soon!",
  },
  {
    id: 5,
    name: "Mark",
    avatar: "https://thispersondoesnotexist.com?5",
    quote:
      "Excellent tool for my small business; scheduling deliveries has never been smoother.",
  },
  {
    id: 6,
    name: "Liam",
    avatar: "https://thispersondoesnotexist.com?6",
    quote:
      "he customer service quickly solved all the issues about my package. They also contacted the shipping provider and resolved the related issues",
  },
  {
    id: 7,
    name: "Fatima",
    avatar: "https://thispersondoesnotexist.com?7",
    quote: "Love it! My packages delivered without any problem. Thank you!",
  },
  {
    id: 8,
    name: "Carlos",
    avatar: "https://thispersondoesnotexist.com?8",
    quote:
      "Convenient and affordable; could be better if tracking was more detailed.",
  },
];

const deliveryImages = [
  "/assets/images/reviews/carousel-image-1.webp",
  "/assets/images/reviews/carousel-image-2.webp",
  "/assets/images/reviews/carousel-image-5.webp",
  "/assets/images/reviews/carousel-image-7.webp",
  "/assets/images/reviews/carousel-image-3.webp",
  "/assets/images/reviews/carousel-image-6.webp",
  "/assets/images/reviews/carousel-image-4.webp",
];

export default function TestimonialsSection() {
  const sm = useMediaQuery("(min-width: 640px)");
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  const xl = useMediaQuery("(min-width: 1280px)");
  const slidesToShow = xl ? 5 : lg ? 4 : md ? 3 : sm ? 3 : 1;
  const slideSize = sm ? (96 / slidesToShow).toFixed(1) : "50";
  return (
    <article className="py-[80px] md:py-[100px] safe-area">
      <Title className="safe-area" order={2} size="h1" fw={800} mb="xl">
        We&apos;ve Served Over 8000+ Deliveries
      </Title>

      {/* Delivery Images Carousel */}
      <CarouselComponent
        height={200}
        slideSize={`${slideSize}%`}
        slidesToScroll={1}
        mb="xl"
        withIndicators={false}
        slideGap="md"
        align="start"
        loop
        withControls={false}
      >
        {deliveryImages.map((image, index) => (
          <Carousel.Slide key={index}>
            <Image
              src={image}
              height={142}
              width={200}
              className="rounded-lg !object-fill rotate-12"
              alt={`Delivery image ${index + 1}`}
            />
          </Carousel.Slide>
        ))}
      </CarouselComponent>

      {/* Testimonials Grid */}
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
        className="mt-8"
      >
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            padding="lg"
            radius="md"
            className="hover:shadow-lg transition-shadow duration-300 !bg-gray-50"
          >
            <Group wrap="nowrap">
              <Avatar src={testimonial.avatar} size="md" radius="xl" />
              <div>
                <Text size="sm" fw={600}>
                  {testimonial.quote}
                </Text>
                <Text size="sm" c="dimmed">
                  {testimonial.name}
                </Text>
              </div>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </article>
  );
}
