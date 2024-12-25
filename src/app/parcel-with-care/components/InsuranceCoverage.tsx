import { Card, Title, Text, ThemeIcon, Grid } from "@mantine/core";
import { IconCheck, IconHome, IconSettings } from "@tabler/icons-react";
import Image from "next/image";

const data = [
  {
    title: "Comprehensive Protection",
    description:
      "We provide a range of insurance options to protect your parcels from unforeseen circumstances during transit, ensuring maximum security and reliability.",
    icon: <IconHome color="blue" size={24} />, // Replace with any icon you like or use an SVG
  },
  {
    title: "Customizable Coverage",
    description:
      "Our flexible insurance plans allow you to tailor coverage to suit the unique needs of your shipment, whether it involves high-value items or fragile goods.",
    icon: <IconSettings color="blue" size={24} />,
  },
  {
    title: "Easy Claim Process",
    description:
      "In the rare event of loss or damage, our smooth and straightforward claim process ensures quick resolution, giving you confidence and peace of mind while shipping.",
    icon: <IconCheck color="blue" size={24} />,
  },
];

const POWERED_BY = [
  "/assets/icons/powered-by/ergo.svg",
  "/assets/icons/powered-by/FRC-2x.svg",
  "/assets/icons/powered-by/post.svg",
  "/assets/icons/powered-by/proSieben.svg",
];

export default function InsuranceCoverage() {
  return (
    <div className="safe-area py-12 text-center">
      <Title order={2} className="!mx-auto !mb-4 text-3xl font-bold">
        Insurance Coverage for Your Peace of Mind
      </Title>
      <Text color="dimmed" className="!mb-8">
        Comprehensive, flexible, and hassle-free protection tailored to
        safeguard your shipments.
      </Text>
      <Grid align="center" justify="space-between" gutter="lg">
        {data.map((item, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 4 }}>
            <Card
              key={index}
              shadow="sm"
              padding="lg"
              radius="md"
              className="border border-gray-200 text-start"
            >
              <ThemeIcon color="blue.1" size={40} radius="md">
                {item.icon}
              </ThemeIcon>
              <Title order={2} className="teitTitlexl !mb-2 !mt-[20px]">
                {item.title}
              </Title>
              <Text size="sm" color="dimmed">
                {item.description}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
        {POWERED_BY?.map((path, index) => (
          <Image
            className="object-contain"
            key={path}
            width={70}
            height={40}
            src={path}
            alt={`powered-by-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
