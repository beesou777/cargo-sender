import { useGetAQuote } from "@/hooks/useGetAQuote";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { useShipmentStore } from "@/store/quote/shipment";
import { useSteeper } from "@/store/step";
import { Icon } from "@iconify/react";
import { Button, Checkbox, Divider, Text, Title } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";

type OrderSummerySectionT = {
  submitHandler: () => boolean;
};

const OrderSummerySection = (
  { submitHandler }: OrderSummerySectionT = { submitHandler: () => true }
) => {
  const { activeStep, setStep } = useSteeper();
  const [shippingTerms, setShippingTerms] = useState(false);
  const [cargoTerms, setCargoTerms] = useState(false);

  const quoteDataStore = useGetAQuoteDataStore();
  const shipmentStore = useShipmentStore();
  const quoteSharedStore = useQuoteSharedStore();

  const getAQuote = useGetAQuote()

  const { quoteData: QUOTE_DATA } = quoteDataStore;


  async function next() {
    switch (activeStep) {
      case 0:
        {
          setStep(activeStep + 1)
        }
        break;
      case 1:
        {
          const response = await submitHandler && submitHandler() as unknown as boolean
          if (response) {

            await getAQuote.mutation()
          }
        }
        break;
      case 2:
        {

        }
        break;
      case 3:
        {

        }
        break;
    }
  }
  function previous() {
    if (activeStep) setStep(activeStep - 1);
  }
  return (
    <aside className="bg-white p-6 w-full rounded-xl flex flex-col gap-[4rem] justify-between lg:max-w-[350px] md:min-h-[80svh]">
      <div className="grid gap-4">
        <Title order={4}>Order Summery</Title>
        {/* Location */}
        <section className="flex flex-col gap-2">
          <Text className="text-gray-400">PICKUP</Text>
          <div>
            <Text className="font-bold">{shipmentStore.shipment.pickupAddress.country as string}</Text>
            <Text className="text-gray-400">
              {shipmentStore.shipment.pickupAddress.region as string} - {shipmentStore.shipment.pickupAddress.regionId as string}
            </Text>
          </div>
          <div>
            <Text className="font-bold">{shipmentStore.shipment.deliveryAddress.country as string}</Text>
            <Text className="text-gray-400">
              {shipmentStore.shipment.deliveryAddress.region as string} - {shipmentStore.shipment.deliveryAddress.regionId as string}
            </Text>
          </div>
        </section>
        <Divider />
        {/* Shipping Info */}
        <section className="flex flex-col gap-2">
          <Text className="text-gray-400">SHIPPING OPTIONS</Text>
          {QUOTE_DATA.parcels.packages?.map((item, index) => (
            <div
              key={item.parcelId! + index}
              className="flex gap-4 justify-between"
            >
              <Text className="">{item.quantity}x Package</Text>
              <Text className="text-gray-400">
                {`${item.weight} ${quoteSharedStore.unit.weight}`}
              </Text>
            </div>
          ))}
          {QUOTE_DATA.parcels.pallets?.map((item, index) => (
            <div
              key={item.parcelId! + index}
              className="flex gap-4 justify-between"
            >
              <Text className="">{item.quantity}x Pallet</Text>
              <Text className="text-gray-400">
                {`${item.weight} ${quoteSharedStore.unit.weight}`}
              </Text>
            </div>
          ))}
        </section>
        <Divider />
        {/* Cost Summery Info */}
        <section className="flex gap-4 justify-between">
          <div className="flex flex-col gap-1 items-start">
            <Text className="font-bold">Total</Text>
            <Text className="text-sm text-gray-400">incl. VAT</Text>
          </div>
          <Text className="font-bold text-blue-500">€35</Text>
        </section>
      </div>
      <section className="grid gap-4">
        {activeStep > 1 && (
          <>
            <Checkbox
              defaultChecked={shippingTerms}
              checked={shippingTerms}
              onChange={() => setShippingTerms(!shippingTerms)}
              label={
                <span>
                  I agree that i am not shipping any
                  <Link className="mx-1" href="/">
                    restricted
                  </Link>
                  or
                  <Link className="mx-1" href="/">
                    prohibited
                  </Link>
                  items
                </span>
              }
            />
            <Checkbox
              defaultChecked={cargoTerms}
              checked={cargoTerms}
              onChange={() => setCargoTerms(!cargoTerms)}
              label={
                <span>
                  I agree to
                  <Link className="mx-1" href="/">
                    Bettersender’s T&C
                  </Link>
                  and chosen
                  <Link className="mx-1" href="/">
                    courier’s T&C
                  </Link>
                </span>
              }
            />
          </>
        )}
        <div className="flex gap-4">
          {activeStep != 0 && (
            <Button
              leftSection={<Icon icon="solar:arrow-left-outline" />}
              variant="light"
              onClick={previous}
            >
              Prev
            </Button>
          )}
          <Button onClick={next} className="flex-1">
            Continue
          </Button>
        </div>
      </section>
    </aside>
  );
};

export default OrderSummerySection;
