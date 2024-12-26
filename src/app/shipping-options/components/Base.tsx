"use client";
import React from "react";
import { Button, Container, Text, Title, Grid, Box } from "@mantine/core";
import { IconBox } from "@tabler/icons-react";

export default function BaseOptions() {
  return (
    <Container size="xl">
      <Grid align="start">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title
            order={1}
            className="mb-4 text-2xl font-bold text-black md:text-4xl"
          >
            Get Started by Choosing the Right Shipping Option
          </Title>
          <div className="relative">
            <IconBox className="absolute left-3 z-0 text-gray-50" size={350} />
          </div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }} className="z-10">
          <Text size="md" className="mb-6 text-gray-600">
            At Cargosender.com, we recognize that every shipment has unique
            requirements. Our variety of shipping services ensures you find the
            perfect solution, whether you’re looking for affordability,
            flexibility, or speed. Take time to review the options and select
            the one that fits your needs best. If you have any questions, our
            team is always ready to assist.
          </Text>
          <Box className="mt-8 flex gap-4">
            <Button
              size="lg"
              radius="md"
              className="bg-blue-600 text-white hover:bg-blue-700"
              fullWidth
            >
              Get Started
            </Button>
            <Button
              size="lg"
              radius="md"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              fullWidth
            >
              Contact Support
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
