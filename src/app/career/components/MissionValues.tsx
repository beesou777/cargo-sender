"use client";
import {
  IconCashBanknote,
  IconHeartbeat,
  IconTargetArrow,
  IconPlant,
} from "@tabler/icons-react";
import { Card, Title, Text, ThemeIcon, Grid } from "@mantine/core";

export default function MissionValues() {
  const data = [
    {
      title: "Competitive Salary",
      description: "Regularly updated to reflect market trends and inflation.",
      icon: <IconCashBanknote color="blue" size={24} />, // Replace with any icon you like or use an SVG
    },
    {
      title: "Healthcare & Wellbeing",
      description:
        "Health coverage, mental wellness programs, and more to support you fully.",
      icon: <IconHeartbeat color="blue" size={24} />,
    },
    {
      title: "Annual Leaves",
      description:
        "Take the time you need to recharge and maintain your balance",
      icon: <IconPlant color="blue" size={24} />,
    },
  ];
  return (
    <div className="safe-area">
      <section className="bg-gray-100 px-20 py-12 text-center">
        <IconTargetArrow size={40} color="blue" className="mx-auto" />
        <Title order={2} className="!mx-auto py-[20px] text-3xl font-bold">
          Our Mission and Values
        </Title>
        <Text color="dimmed" className="!mb-8">
          Cargosender began as a bold idea to transform the logistics industry,
          and today, we’re driven by the same mission: making shipping smarter,
          simpler, and universally accessible. From our roots in Poland, we’ve
          grown into a dynamic, collaborative team pushing the boundaries of
          logistics innovation. We believe in empowering our team, championing
          flexible work culture, and leading with transparency and purpose.
        </Text>
      </section>

      <Grid
        className="py-[60px] md:py-[80px]"
        align="center"
        justify="space-between"
        gutter="lg"
      >
        {data.map((item, index) => (
          <Grid.Col className="gap-4" key={index} span={{ base: 12, md: 4 }}>
            <Card
              key={index}
              shadow="sm"
              padding="lg"
              radius="md"
              className="min-h-[200px] border border-gray-200 text-start"
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
    </div>
  );
}
