import React from "react";
import {
  Grid,
  Image,
  Text,
  Title,
  Box,
  List,
  ThemeIcon,
  Container,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface FeatureSectionProps {
  title: string;
  description: string;
  points: string[];
  imageUrl: string;
  reverse?: boolean;
}

export default function FeatureSection({
  title,
  description,
  points,
  imageUrl,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <Container size="xl">
      <Grid
        align="center"
        justify="space-between"
        gutter="lg"
        className="!my-8"
      >
        <Grid.Col span={{ base: 12, md: 6 }} order={reverse ? 2 : 1}>
          <Box className="overflow-hidden rounded-lg">
            <Image src={imageUrl} alt={title} />
          </Box>
        </Grid.Col>

        <Grid.Col
          offset={{ md: reverse ? 0 : 1 }}
          span={{ base: 12, md: 5 }}
          order={{ md: reverse ? 1 : 2, sm: reverse ? 2 : 1 }}
        >
          <Title order={2} className="text-xl md:text-2xl font-bold mb-4">
            {title}
          </Title>
          <Text size="sm" className="text-gray-400 !my-4">
            {description}
          </Text>
          <List
            spacing="lg"
            size="sm"
            center
            icon={
              <ThemeIcon color="green.2" size={40} radius="xl">
                <IconCheck size={24} color="green" />
              </ThemeIcon>
            }
          >
            {points.map((point, index) => (
              <List.Item key={index}>{point}</List.Item>
            ))}
          </List>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
