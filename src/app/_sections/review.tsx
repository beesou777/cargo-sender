'use client'
import { Card, Text, Avatar, Group, Title, SimpleGrid, Image } from '@mantine/core'
import { Carousel as CarouselComponent } from '@mantine/carousel'
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";


const testimonials = [
  {
    id: 1,
    name: 'Arushi',
    avatar: '/placeholder.svg?height=40&width=40',
    quote: 'I usually save more than 30% with better sender.',
  },
  {
    id: 2,
    name: 'Arushi',
    avatar: '/placeholder.svg?height=40&width=40',
    quote: 'Better Sender has been a game changer for me.',
  },
  {
    id: 3,
    name: 'Arushi',
    avatar: '/placeholder.svg?height=40&width=40',
    quote: 'Better Sender has been a game changer for me.',
  },
  {
    id: 4,
    name: 'Arushi',
    avatar: '/placeholder.svg?height=40&width=40',
    quote: 'I usually save more than 30% with better sender.',
  },
  {
    id: 5,
    name: 'Arushi',
    avatar: '/placeholder.svg?height=40&width=40',
    quote: 'I usually save more than 30% with better sender.',
  },
  {
    id: 6,
    name: 'Arushi',
    avatar: '/placeholder.svg?height=40&width=40',
    quote: 'Better Sender has been a game changer for me.',
  },
  {
    id: 7,
    name: 'Arushi',
    avatar: '/placeholder.svg?height=40&width=40',
    quote: 'Better Sender has been a game changer for me.',
  },
  {
    id: 8,
    name: 'Arushi',
    avatar: '/placeholder.svg?height=40&width=40',
    quote: 'I usually save more than 30% with better sender.',
  },
]

const deliveryImages = [
    '/assets/images/reviews/carousel-image-1.webp',
    '/assets/images/reviews/carousel-image-2.webp',
    '/assets/images/reviews/carousel-image-5.webp',
  '/assets/images/reviews/carousel-image-7.webp',
  '/assets/images/reviews/carousel-image-3.webp',
  '/assets/images/reviews/carousel-image-6.webp',
  '/assets/images/reviews/carousel-image-4.webp',
]

export default function TestimonialsSection() {
    const sm = useMediaQuery("(min-width: 640px)");
    const md = useMediaQuery("(min-width: 768px)");
    const lg = useMediaQuery("(min-width: 1024px)");
    const xl = useMediaQuery("(min-width: 1280px)");
    const slidesToShow = xl ? 5 : lg ? 4 : md ? 3 : sm ? 3 : 1;
    const slideSize = sm ? (96 / slidesToShow).toFixed(1) : "50";
  return (
    <article className='py-[80px] md:py-[100px] safe-area'>
      <Title
      className='safe-area'
        order={2}
        size="h1"
        fw={800}
        mb="xl"
      >
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
            <Group wrap="nowrap" >
              <Avatar
                src={testimonial.avatar}
                size="md"
                radius="xl"
              />
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
  )
}

