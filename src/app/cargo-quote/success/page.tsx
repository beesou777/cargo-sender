"use client";

import {
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Grid,
  ThemeIcon,
  Divider,
  Skeleton,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import useQuery from "@/hooks/useQuery";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";

interface dashboardDataError {
  status: number;
  isLoading: boolean;
}

interface OrderDetails {
  message: string;
  details: {
    orderCode: string;
    status: string;
    serviceType: string;
    email: string;
    paymentMethod: string;
    currencyCode: string;
    vatRate: string;
    shipment: {
      pickupAddress: Address;
      pickupContact: Contact;
      deliveryAddress: Address;
      deliveryContact: Contact;
      pickupDate: string;
      routeDistance: number;
    };
    estimatedDeliveryTime: string;
    price: Price;
    discount: Discount;
    insurance: any;
  };
}

interface Address {
  street: string;
  zip: string;
  city: string;
  region: string | null;
  country: string;
}

interface Contact {
  name: string;
  phone: string;
}

interface Price {
  original: {
    currencyCode: string;
    gross: number;
    net: number;
  };
}

interface Discount {
  rate: string;
  discount: {
    original: {
      currencyCode: string;
      gross: number;
      net: number;
    };
  };
}

function OrderContent() {
  const searchParams = useSearchParams();
  const data = useQuery(
    `/orders/${searchParams.get("orderId")}?anon=true`,
    {},
    [searchParams.get("orderId")]
  ) as {
    data: OrderDetails;
    error: dashboardDataError;
    isLoading: boolean;
  };

  const order: OrderDetails | undefined = data?.data;

  const countryFlags = {
    Collect: order?.details.shipment?.pickupAddress?.country
      ? `flagpack:${order.details.shipment.pickupAddress.country.toLowerCase()}`
      : "carbon:flag-filled",
    Deliver: order?.details.shipment?.deliveryAddress?.country
      ? `flagpack:${order.details.shipment.deliveryAddress.country.toLowerCase()}`
      : "carbon:flag-filled",
  };

  return (
    <div className="safe-area mt-4">
      <Grid grow>
        <Grid.Col span={9}>
          <Paper radius="md" p="md" bg={"gray.1"} mb="xl">
            <Title order={2} mb={"md"}>
              Order Confirmation
            </Title>
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
              {/* Pickup Address */}
              <Grid.Col span={6}>
                <Stack>
                  <Text fw={500}>Pickup Address</Text>
                  <Group>
                    {order?.details.shipment?.pickupAddress ? (
                      <>
                        <Icon className="text-xl" icon={countryFlags.Collect} />
                        <Text>
                          {order?.details.shipment.pickupAddress.country}
                        </Text>
                        <Text>
                          {`${order?.details.shipment.pickupAddress.street} - ${order.details.shipment.pickupAddress.city} - ${order.details.shipment.pickupAddress.zip}`}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Skeleton height={20} width={50} />
                        <Skeleton height={16} width="70%" />
                      </>
                    )}
                  </Group>
                </Stack>
              </Grid.Col>

              {/* Delivery Address */}
              <Grid.Col span={6}>
                <Stack>
                  <Text fw={500}>Delivery Address</Text>
                  <Group>
                    {order?.details?.shipment?.deliveryAddress ? (
                      <>
                        <Icon className="text-xl" icon={countryFlags.Deliver} />
                        <Text>
                          {order.details.shipment.deliveryAddress.country}
                        </Text>
                        <Text>
                          {`${order.details.shipment.deliveryAddress.street} - ${order.details.shipment.deliveryAddress.city} - ${order.details.shipment.deliveryAddress.zip}`}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Skeleton height={20} width={50} />
                        <Skeleton height={16} width="70%" />
                      </>
                    )}
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>

            <Divider my="md" />

            <Group justify="space-between" style={{ width: "100%" }}>
              <Text>Order Number</Text>
              <Text fw={500}>
                {order?.details.orderCode || (
                  <Skeleton width={150} height={20} />
                )}
              </Text>
            </Group>

            <Group justify="space-between" style={{ width: "100%" }}>
              <Text>Estimated Delivery Date</Text>
              <Text fw={500}>
                {order?.details?.estimatedDeliveryTime ? (
                  order.details.estimatedDeliveryTime + " days"
                ) : (
                  <Skeleton width={150} height={20} />
                )}
              </Text>
            </Group>

            <Group justify="space-between" style={{ width: "100%" }}>
              <Text>Estimated Delivery Date</Text>
              <Text fw={500}>
                {order?.details?.serviceType ? (
                  order.details.serviceType
                ) : (
                  <Skeleton width={150} height={20} />
                )}
              </Text>
            </Group>

            <Group justify="space-between" style={{ width: "100%" }}>
              <Text>Sub Total</Text>
              <Text fw={500}>
                {order?.details?.price?.original?.net ? (
                  `${(order.details.price.original.net * 1.5).toFixed(2)} ${order?.details?.currencyCode}`
                ) : (
                  <Skeleton width={100} height={20} />
                )}
              </Text>
            </Group>

            {order?.details?.insurance && (
              <Group justify="space-between" style={{ width: "100%" }}>
                <Text>Insurance</Text>
                <Text fw={500}>
                  {order.details.insurance.price?.original?.net !==
                  undefined ? (
                    `${order.details.insurance.price.original.net} ${order?.details?.currencyCode}`
                  ) : (
                    <Skeleton width={100} height={20} />
                  )}
                </Text>
              </Group>
            )}

            <Divider my="md" />

            <Group justify="space-between">
              <Text size="lg" fw={700}>
                Total Price with VAT
              </Text>
              <Text size="lg" fw={700} c="blue">
                {!order?.details?.price?.original?.gross &&
                !order?.details?.insurance?.price?.original?.net ? (
                  <Skeleton width={100} height={20} />
                ) : (
                  `${(order?.details?.price?.original?.gross * 1.5 + (order?.details?.insurance?.price?.original?.net || 0)).toFixed(2)} ${order?.details?.currencyCode}`
                )}
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
                <Stack className="group">
                  <Link href="/blogs/no-category/how-to-pack-and-prepare-your-parcel-for-hassle-free-shipping">
                    <Image
                      src="https://i.postimg.cc/rpgDwR6L/packages.webp"
                      width={540}
                      height={132}
                      className="h-[132px] w-full"
                      alt="Picture of the author"
                    />
                    <Text
                      c="dimmed"
                      size="sm"
                      className="group-hover:!underline"
                    >
                      Learn how to best pack your package
                    </Text>
                  </Link>
                </Stack>
              </Grid.Col>

              <Grid.Col span={12}>
                <Stack className="group">
                  <Link href="/blogs/no-category/understanding-boxes-envelopes-and-pallets-in-the-courier-industry">
                    <Image
                      src="https://i.postimg.cc/3ws18q2G/pallets.webp"
                      width={540}
                      className="h-[132px] w-full"
                      height={132}
                      alt="Picture of the author"
                    />
                    <Text
                      c="dimmed"
                      size="sm"
                      className="group-hover:!underline"
                    >
                      Learn how to pack for pallet
                    </Text>
                  </Link>
                </Stack>
              </Grid.Col>

              <Grid.Col span={12}>
                <Stack className="group">
                  <Link href="/blogs/no-category/how-to-pack-and-prepare-your-parcel-for-hassle-free-shipping">
                    <Image
                      src="https://i.postimg.cc/NGzMKw5Z/packaging.webp"
                      className="h-[132px] w-full object-fill"
                      width={540}
                      height={132}
                      alt="Picture of the author"
                    />
                    <Text
                      c="dimmed"
                      size="sm"
                      className="group-hover:!underline"
                    >
                      See all packing tips
                    </Text>
                  </Link>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default function OrderConfirmation() {
  return (
    <Suspense fallback={<div className="min-h-[80vh]">Loading...</div>}>
      <OrderContent />
    </Suspense>
  );
}
