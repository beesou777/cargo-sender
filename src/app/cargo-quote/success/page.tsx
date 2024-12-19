"use client";

import {
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Grid,
  ThemeIcon,
  List,
  Divider,
} from "@mantine/core";
import { IconCheck, IconTruck, IconPackage } from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import { DASHBOARD_API } from "@/api/dashboard";
import useQuery from "@/hooks/useQuery";
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
interface dashboardDataError {
  status: number;
  isLoading: boolean;
}

interface Order {
  order_code: string;
  email: string;
  tracking_code: string;
  euroSenderOrder: EuroSenderOrder;
}

// Props type
interface DashboardPageProps {
  params: {
    id: string;
  };
}


interface Contact {
  name: string;
  phone: string;
}

interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;

}

interface Shipment {
  pickupContact: Contact;
  deliveryContact: Contact;
  pickupAddress: Address;
  deliveryAddress: Address;
  pickupDate: string;
}

interface Price {
  original: {
    gross: number;
    net: number
  };
}

interface Courier {
  shortName: string;
}

interface Package {
  parcelId: string;
  type: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  value: number;
  tracking?: string;
}

interface EuroSenderOrder {
  shipment: Shipment;
  price: Price;
  courier: Courier;
  parcels: {
    packages: Package[];
  };
  insurance: {
    text: string,
    price: {
      original: {
        currencyCode: string,
        gross: number,
        net: number
      }
    }
  }
}


export default function OrderConfirmation() {
  const searchParams = useSearchParams()
  const DASHBOARD_DATA = useQuery(DASHBOARD_API.DASHBOARD, {
    startDate: "2024-10-26 01:15:00",
    endDate: "2025-10-26 05:15:00",
    limit: 10,
    skip: 0,
    orderCode: searchParams.get('orderId'),
  }) as {
    data: { data: { orders: Order[] } };
    error: dashboardDataError;
    isLoading: boolean;
  };

  const order: Order | undefined = DASHBOARD_DATA.data?.data?.orders[0];

  const countryFlags = {
    Collect: order?.euroSenderOrder?.shipment?.pickupAddress?.country
      ? `flagpack:${(order?.euroSenderOrder?.shipment?.pickupAddress?.country as string).toLocaleLowerCase()}`
      : "carbon:flag-filled",
    Deliver: order?.euroSenderOrder?.shipment?.deliveryAddress?.country
      ? `flagpack:${(order?.euroSenderOrder?.shipment?.deliveryAddress?.country as string).toLocaleLowerCase()}`
      : "carbon:flag-filled",
  };
  return (
    <div className="safe-area mt-4">
      <Grid grow>
        <Grid.Col span={9}>
          <Paper radius="md" p="md" bg={"gray.1"} mb="xl">
            <Title order={2} mb={"md"}>Order Confirmation</Title>
            <Stack align="center">
              <ThemeIcon size={56} radius={56} color="green.5">
                <IconCheck size={32} />
              </ThemeIcon>
              <Text c="dimmed" ta="center">
                Your shipping order was successfully placed. You will receive an
                email shortly.
              </Text>
            </Stack>
          </Paper>
          {/* Order Details */}
          <Paper radius="md" p="md" bg={"gray.1"} mb="xl">
            <Title order={3} mb="lg">
              Order Overview
            </Title>

            <Grid mb="xl">
              <Grid.Col span={6}>
                <Stack>
                  <Text fw={500}>Pickup Address</Text>
                  <Group>
                    <Icon className="text-xl" icon={countryFlags.Collect} />
                      {order?.euroSenderOrder?.shipment?.pickupAddress?.country || "loading..."}
                    <Text>{(order?.euroSenderOrder?.shipment?.pickupAddress?.street + '-' + order?.euroSenderOrder?.shipment?.pickupAddress?.city + '-' + order?.euroSenderOrder?.shipment?.pickupAddress?.zip) || "no shipment"}</Text>
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col span={6}>
                <Stack>
                  <Text fw={500}>Delivery Address</Text>
                  <Group>
                    <Icon className="text-xl" icon={countryFlags.Deliver  } />
                      {order?.euroSenderOrder?.shipment?.deliveryAddress?.country || "loading..."}
                    <Text>{(order?.euroSenderOrder?.shipment?.deliveryAddress?.street + '-' + order?.euroSenderOrder?.shipment?.deliveryAddress?.city + '-' + order?.euroSenderOrder?.shipment?.deliveryAddress?.zip) || "no shipment"}</Text>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>

            <Divider my="md" />

            <Group justify="space-between" style={{ width: '100%' }}>
              <Text>Order Number</Text>
              <Text fw={500}>{order?.order_code}</Text>
            </Group>
            <Group justify="space-between" style={{ width: '100%' }}>
              <Text>Estimated Delivery Date</Text>
              <Text fw={500}>
                {order?.euroSenderOrder?.shipment?.pickupDate.split('T')[0] || 'loading...'}
              </Text>
            </Group>
            <Group justify="space-between" style={{ width: '100%' }}>
              <Text>Tracking Number</Text>
              <Text fw={500}>{order?.tracking_code || 'Not yet assigned'}</Text>
            </Group>
            <Group justify="space-between" style={{ width: '100%' }}>
              <Text>Sub Total</Text>
              <Text fw={500}>€{order?.euroSenderOrder?.price?.original?.net || '0'}</Text>
            </Group>
            <Group justify="space-between" style={{ width: '100%' }}>
              <Group className="!flex-col !items-start" gap="0" >
                <Text>Additionals</Text>
                <Text dangerouslySetInnerHTML={{ __html: order?.euroSenderOrder?.insurance?.text || 'no' }} />
              </Group>
              <Text fw={500}>€{order?.euroSenderOrder?.insurance?.price?.original?.net || '0'}</Text>
            </Group>

            <Divider my="md" />
            <Group justify="space-between">
              <Text size="lg" fw={700}>
                Total Price with VAT
              </Text>
              <Text size="lg" fw={700} c="blue">
                €{order?.euroSenderOrder?.price?.original?.gross || "0"}
              </Text>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={3}>
          <Paper radius="md" p="md" bg={"gray.1"}>
            <Group mb="xl">
              <Title order={3}>Our Resources</Title>
              <Text
                c="blue"
                component="a"
                href="/blogs"
                style={{ textDecoration: "none" }}
              >
                View all
              </Text>
            </Group>

            <Grid>
              <Grid.Col span={12}>
                <Stack>
                  <Image
                    src="https://i.postimg.cc/rpgDwR6L/packages.webp"
                    width={540}
                    height={132}
                    className="w-full h-[132px]"
                    alt="Picture of the author"
                  />
                  <Text c="dimmed" size="sm">
                    Learn how to best pack your package
                  </Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={12}>

                <Stack>
                  <Image
                    src="https://i.postimg.cc/3ws18q2G/pallets.webp"
                    width={540}
                    className="w-full h-[132px]"
                    height={132}
                    alt="Picture of the author"
                  />
                  <Text c="dimmed" size="sm">
                    Learn how to pack for pallet
                  </Text>
                </Stack>
              </Grid.Col>

              <Grid.Col span={12}>
                <Stack>
                  <Image
                    src="https://i.postimg.cc/NGzMKw5Z/packaging.webp"
                    className="w-full h-[132px] object-fill"
                    width={540}
                    height={132}
                    alt="Picture of the author"
                  />
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
