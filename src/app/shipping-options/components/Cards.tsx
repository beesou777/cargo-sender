import {
  Container,
  Grid,
  Image,
  Text,
  Title,
  Group,
  ThemeIcon,
} from "@mantine/core";

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
      <Grid align="center" gutter="xl">
        {/* Left Column */}
        <Grid.Col span={{ base: 12, md: 6 }} order={reverse ? 2 : 1}>
          <Title order={2} style={{ marginBottom: "1rem" }}>
            {title}
          </Title>
          <Text color="dimmed" style={{ marginBottom: "2rem" }}>
            {description}
          </Text>

          {features.map((feature, index) => (
            <Group
              className={`!flex-col pl-4 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-[2px] before:h-full before:bg-gray-200 ${
                index === 0 ? "before:!bg-blue-500" : ""
              }`}
              align="start"
              key={index}
            >
              <ThemeIcon
                className={`${index === 0 ? "first:!bg-[#1320AE] !text-white " : "mt-4"}`}
                size={40}
                radius="md"
                variant="light"
                color="blue"
              >
                {feature.icon}
              </ThemeIcon>
              <div>
                <Text size="lg" className="!font-semibold">
                  {feature.title}
                </Text>
                <Text className="!text-gray-400">{feature.description}</Text>
              </div>
            </Group>
          ))}
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col
          span={{ base: 12, md: 6 }}
          order={{ md: reverse ? 1 : 2, sm: reverse ? 2 : 1 }}
        >
          <Image
            className="md:w-full md:h-full h-[200px]"
            src={imageUrl}
            alt={title}
            fit="cover"
            radius="md"
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ShippingCards;
