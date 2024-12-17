"use client";

import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Grid,
  ThemeIcon,
  List,
} from "@mantine/core";
import { IconCheck, IconTruck, IconPackage } from "@tabler/icons-react";

export default function OrderConfirmation() {
  return (
    <Container size="lg" py="xl">
      {/* Success Message */}
      <Paper radius="md" p="xl" withBorder mb="xl">
        <Stack align="center">
          <ThemeIcon size={56} radius={56} color="green">
            <IconCheck size={32} />
          </ThemeIcon>
          <Title order={2}>Order Confirmation</Title>
          <Text c="dimmed" ta="center">
            Your shipping order was successfully placed. You will receive an
            email shortly.
          </Text>
        </Stack>
      </Paper>

      {/* Order Details */}
      <Paper radius="md" p="xl" withBorder mb="xl">
        <Title order={3} mb="lg">
          Order Overview
        </Title>

        <Grid mb="xl">
          <Grid.Col span={6}>
            <Stack>
              <Text fw={500}>Pickup Address</Text>
              <Group>
                <Badge variant="dot" color="blue">
                  IN
                </Badge>
                <Text>Uttar Pradesh - Lucknow - 123445</Text>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={6}>
            <Stack>
              <Text fw={500}>Delivery Address</Text>
              <Group>
                <Badge variant="dot" color="red">
                  NP
                </Badge>
                <Text>Bagmati - Kathmandu - 44600</Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <List spacing="md">
          <List.Item>
            <Group>
              <Text>Order Number</Text>
              <Text fw={500}>77445512</Text>
            </Group>
          </List.Item>
          <List.Item>
            <Group>
              <Text>Estimated Delivery Date</Text>
              <Text fw={500}>Jan 11, 2024</Text>
            </Group>
          </List.Item>
          <List.Item>
            <Group>
              <Text>Tracking Number</Text>
              <Text fw={500}>Not yet assigned</Text>
            </Group>
          </List.Item>
          <List.Item>
            <Group>
              <Text>Weight</Text>
              <Text fw={500}>2 kg</Text>
            </Group>
          </List.Item>
          <List.Item>
            <Group>
              <Text>Sub Total</Text>
              <Text fw={500}>€34.32</Text>
            </Group>
          </List.Item>
        </List>

        <Paper withBorder p="md" radius="md" mt="xl">
          <Group>
            <Text size="lg" fw={700}>
              Total Price with VAT
            </Text>
            <Text size="lg" fw={700} c="blue">
              €34.32
            </Text>
          </Group>
        </Paper>
      </Paper>

      {/* Resources Section */}
      <Paper radius="md" p="xl" withBorder>
        <Group mb="xl">
          <Title order={3}>Our Resources</Title>
          <Text
            c="blue"
            component="a"
            href="#"
            style={{ textDecoration: "none" }}
          >
            View all
          </Text>
        </Group>

        <Grid>
          <Grid.Col span={4}>
            <Paper p="md" radius="md" withBorder>
              <Stack>
                <div
                  style={{
                    height: 200,
                    background: "#f1f3f5",
                    borderRadius: 8,
                  }}
                >
                  <IconPackage
                    size={48}
                    style={{
                      margin: "76px auto",
                      display: "block",
                      opacity: 0.5,
                    }}
                  />
                </div>
                <Text fw={500}>How to best pack your package</Text>
                <Text c="dimmed" size="sm">
                  Learn how to best pack your package
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={4}>
            <Paper p="md" radius="md" withBorder>
              <Stack>
                <div
                  style={{
                    height: 200,
                    background: "#f1f3f5",
                    borderRadius: 8,
                  }}
                >
                  <IconTruck
                    size={48}
                    style={{
                      margin: "76px auto",
                      display: "block",
                      opacity: 0.5,
                    }}
                  />
                </div>
                <Text fw={500}>Packing for Pallets</Text>
                <Text c="dimmed" size="sm">
                  Learn how to pack for pallet
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={4}>
            <Paper p="md" radius="md" withBorder>
              <Stack>
                <div
                  style={{
                    height: 200,
                    background: "#f1f3f5",
                    borderRadius: 8,
                  }}
                >
                  <IconPackage
                    size={48}
                    style={{
                      margin: "76px auto",
                      display: "block",
                      opacity: 0.5,
                    }}
                  />
                </div>
                <Text fw={500}>Packing Tips & Tricks</Text>
                <Text c="dimmed" size="sm">
                  See all packing tips
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}
