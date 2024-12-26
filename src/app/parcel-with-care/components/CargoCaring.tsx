import { Card, Text, Title, Image, ThemeIcon, Grid } from "@mantine/core";
import {
  IconTruckDelivery,
  IconHandClick,
  IconPackage,
  IconCertificate,
} from "@tabler/icons-react";

const data = [
  {
    title: "Personalized Service",
    description:
      "Our dedicated customer service team is committed to providing personalized attention and tailored solutions to meet your unique shipping needs.",
    icon: <IconHandClick size={24} color="blue" />,
  },
  {
    title: "Reliable Delivery",
    description:
      "We understand the importance of timely deliveries, which is why we work tirelessly to ensure your parcels reach their destination on schedule.",
    icon: <IconTruckDelivery size={24} color="blue" />,
  },
  {
    title: "Careful Handling",
    description:
      "Our team of experienced professionals handles your parcels with the utmost care, ensuring they arrive in perfect condition, every time.",
    icon: <IconPackage size={24} color="blue" />,
  },
  {
    title: "Commitment to Excellence",
    description:
      "At Cargo Sender, we are dedicated to providing a seamless and stress-free shipping experience, exceeding your expectations with every delivery.",
    icon: <IconCertificate size={24} color="blue" />,
  },
];

export default function CaringForCargo() {
  return (
    <div className="safe-area py-12">
      {/* Heading */}
      <Title className="!mb-3 text-3xl font-bold">
        Caring for Your Cargo, Every Step of the Way
      </Title>
      <Text color="dimmed" className="!mb-8">
        Create a free account. Start collecting better research data today — no
        credit card or contract required. Full name. Email address. Password.
      </Text>

      <Grid align="center" justify="space-between" gutter="lg">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            src="/assets/images/footer/cargo-truck.png"
            alt="Trucks"
            radius="md"
            width={530}
            height={430}
            className="object-cover"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Grid align="center" justify="space-between" gutter="lg">
            {data.map((item, index) => (
              <Grid.Col key={index} span={{ base: 6 }}>
                <Card
                  padding="sm"
                  radius="md"
                  className="border border-gray-200"
                >
                  <ThemeIcon color="blue.1" size={40} radius="md">
                    {item.icon}
                  </ThemeIcon>
                  <Text className="text-lg" my={8} fw="bold">
                    {item.title}
                  </Text>
                  <Text size="sm" color="dimmed">
                    {item.description}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
