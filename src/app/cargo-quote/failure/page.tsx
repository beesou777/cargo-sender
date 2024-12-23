'use client';

import { Paper, Title, Text, Group, Stack, Badge, Grid, ThemeIcon, List, Divider, Alert, Box } from '@mantine/core';
import { IconCheck, IconTruck, IconPackage, IconAlertTriangle } from '@tabler/icons-react';

export default function OrderFailure() {
  const troubleshootingSteps = [
    'Check Payment Details: Ensure card info is correct and funds are sufficient.',
    'Try Another Method: Use a different card or payment option.',
    'Contact Bank: Resolve any holds or alerts with your bank.',
    'Clear Browser Cache: Fix potential browser issues.',
    'Retry Payment: Wait and try again later.',
    'Contact Support: Reach out to our team for help.',
  ];
  return (
    <div className="safe-area mt-6">
      <Grid grow>
        <Grid.Col span={8}>
          <Paper radius="md" p="md" bg={'gray.1'} mb="xl">
            <Title order={2} mb={'md'}>
              Order Confirmation
            </Title>
            <Stack my={20} align="center">
              <ThemeIcon size={56} radius={56} color="yellow.4">
                <IconAlertTriangle size={24} />
              </ThemeIcon>
              <Text c="dimmed" ta="center">
                Your order has not yet processed due to payment issues.
              </Text>
            </Stack>
            <Paper p="md" radius="md" bg={'white'}>
              <Stack>
                <Title order={4}>Here&apos;s what you can do</Title>
                <Box component="ol" ml="md">
                  {troubleshootingSteps.map((step, index) => (
                    <Text component="li" key={index} size="sm" mb={'sm'} color="dimmed">
                      {step}
                    </Text>
                  ))}
                </Box>
              </Stack>
            </Paper>
          </Paper>
          {/* Order Details */}
          <Paper radius="md" p="md" bg={'gray.1'} mb="xl">
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

            <Divider my="md" />

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
            <Divider my="md" />
            <Group justify="space-between">
              <Text size="lg" fw={700}>
                Total Price with VAT
              </Text>
              <Text size="lg" fw={700} c="blue">
                €34.32
              </Text>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper radius="md" p="md" bg={'gray.1'}>
            <Group mb="xl">
              <Title order={3}>Our Resources</Title>
              <Text c="blue" component="a" href="#" style={{ textDecoration: 'none' }}>
                View all
              </Text>
            </Group>

            <Grid>
              <Grid.Col span={12}>
                <Stack>
                  <div
                    style={{
                      height: 132,
                      background: '#f1f3f5',
                      borderRadius: 8,
                    }}
                  >
                    <IconPackage
                      size={48}
                      style={{
                        margin: '56px auto',
                        display: 'block',
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <Text c="dimmed" size="sm">
                    Learn how to best pack your package
                  </Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={12}>
                <Stack>
                  <div
                    style={{
                      height: 132,
                      background: '#f1f3f5',
                      borderRadius: 8,
                    }}
                  >
                    <IconTruck
                      size={48}
                      style={{
                        margin: '56px auto',
                        display: 'block',
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <Text c="dimmed" size="sm">
                    Learn how to pack for pallet
                  </Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={12}>
                <Stack>
                  <div
                    style={{
                      height: 132,
                      background: '#f1f3f5',
                      borderRadius: 8,
                    }}
                  >
                    <IconPackage
                      size={48}
                      style={{
                        margin: '56px auto',
                        display: 'block',
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <Text c="dimmed" size="sm">
                    See all packing tips
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}
