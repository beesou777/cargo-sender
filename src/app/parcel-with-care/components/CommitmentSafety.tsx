import {
  Card,
  Container,
  SimpleGrid,
  Text,
  Title,
  Image,
  ThemeIcon,
  Grid,
} from "@mantine/core";
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

export default function CommitmentSafety() {
  return (
    <div className="safe-area py-16">
      <Grid align="start" gutter="lg">
        <Grid.Col className="align-start" span={{ base: 12, md: 5 }}>
          <Title order={1} className="!mb-3 font-bold">
            Our Commitment to Safety
          </Title>
          <Text color="dimmed" className="!mb-8">
            Delivering peace of mind with secure, reliable, and innovative
            solutions to protect your parcels at every step of their journey.
          </Text>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Grid align="center" justify="space-between" gutter="lg">
            {data.map((item, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                <Card
                  padding="xl"
                  radius="md"
                  className="border border-gray-200 !bg-gray-100"
                >
                  <ThemeIcon color="blue.1" size={40} radius="xl">
                    {item.icon}
                  </ThemeIcon>
                  <Text className="!my-4 text-lg">{item.title}</Text>
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
