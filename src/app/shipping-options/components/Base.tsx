"use client";
import React from 'react';
import { Button, Container, Text, Title, Grid, Box } from '@mantine/core';
import { IconBox } from '@tabler/icons-react';

export default function BaseOptions() {
  return (
    <Container size="xl" >
      <Grid align="start">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={1} className="text-black text-2xl md:text-4xl font-bold mb-4">
            Get Started by Choosing the Right Shipping Option
          </Title>
          <div className="relative">
          <IconBox className="text-gray-50 absolute z-0  left-3" size={350} />
          </div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }} className='z-10'>
          <Text size="md" className="text-gray-600 mb-6">
            At Cargosender.com, we recognize that every shipment has unique requirements.
            Our variety of shipping services ensures you find the perfect solution, whether
            you’re looking for affordability, flexibility, or speed. Take time to review the
            options and select the one that fits your needs best. If you have any questions,
            our team is always ready to assist.
          </Text>
          <Box className="flex gap-4 mt-8">
            <Button size="lg" radius="md" className="bg-blue-600 text-white hover:bg-blue-700 " fullWidth>
              Get Started
            </Button>
            <Button size="lg" radius="md" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" fullWidth>
              Contact Support
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

