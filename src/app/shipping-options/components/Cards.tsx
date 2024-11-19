import { Container, Grid, Image, Text, Title, Group, ThemeIcon } from "@mantine/core";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface StandardShippingProps {
  title: string;
  description: string;
  features: Feature[];
  imageUrl: string;
  reverse?: boolean; // To reverse the layout
  className?: string; // For additional styling
}

const ShippingCards = ({
  title,
  description,
  features,
  imageUrl,
  reverse = false,
  className = "",
}: StandardShippingProps) => {
  return (
    <Container size="xl" className={className} style={{ padding: "2rem 0" }}>
      <Grid
        align="center"
        gutter="xl"
      >
        {/* Left Column */}
        <Grid.Col span={{ base: 12, md: 6 }} order={reverse ? 2 : 1}>
          <Title order={2} style={{ marginBottom: "1rem" }}>
            {title}
          </Title>
          <Text color="dimmed" style={{ marginBottom: "2rem" }}>
            {description}
          </Text>

          {features.map((feature, index) => (
            <Group className="!flex-col pl-4" align="start" style={{ marginBottom: "1.5rem" }} key={index}>
              <ThemeIcon size={40} radius="md" variant="light" color="blue">
                {feature.icon}
              </ThemeIcon>
              <div>
                <Text>{feature.title}</Text>
                <Text color="dimmed">{feature.description}</Text>
              </div>
            </Group>
          ))}
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col span={{ base: 12, md: 6 }} order={reverse ? 1 : 2}>
          <Image src={imageUrl} alt={title} fit="cover" radius="md" />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ShippingCards;
