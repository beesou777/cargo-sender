"use client"
import { useGetAQuote } from "@/hooks/useGetAQuote";
import { useGetAQuoteDataStore } from "@/store/quote/quote";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { useShipmentStore } from "@/store/quote/shipment";
import { useSteeper } from "@/store/step";
import { Icon } from "@iconify/react";
import { Button, Checkbox, Divider, Text, Title } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";

type OrderSummerySectionT = {
  submitHandler?: () => boolean;
}; 

const OrderSummerySection = (
  { submitHandler }: OrderSummerySectionT = { submitHandler: () => true }
) => {
  const { activeStep, setStep } = useSteeper();
  const [shippingTerms, setShippingTerms] = useState(false);
  const [cargoTerms, setCargoTerms] = useState(false);

  const quoteDataStore = useGetAQuoteDataStore();
  const shipmentStore = useShipmentStore();
  const { deliveryAddress: DELIVERY_ADDRESS, pickupAddress: PICKUP_ADDRESS } = shipmentStore.shipment;
  const quoteSharedStore = useQuoteSharedStore();
  const { deliveryCountry: DELIVERY_COUNTRY, pickupCountry: PICKUP_COUNTRY } = quoteSharedStore

  const getAQuote = useGetAQuote()
  const { quoteData: QUOTE_DATA } = quoteDataStore;

  const quoteResponseStore = useQuoteResponseStore()
  const OPTIONS = quoteResponseStore.quoteResponse?.data?.options
  const ORDER = quoteResponseStore.quoteResponse?.data?.order


  async function next() {
    switch (activeStep) {
      case 0:
        {
          setStep(activeStep + 1)
        }
        break;
      case 1:
        {
          const response = typeof submitHandler === "function" ? submitHandler() : false
          if (response) {
            await getAQuote.mutation()
            if (getAQuote.success && !getAQuote.isLoading) {
              setStep(activeStep + 1)
            }
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
            <Text className="font-bold">{PICKUP_COUNTRY?.name as string}</Text>
            <Text className="text-gray-400">
              {(PICKUP_ADDRESS.city || PICKUP_ADDRESS.region) as string} {(PICKUP_ADDRESS.zip && ` · ${PICKUP_ADDRESS.zip}`) as string}
            </Text>
          </div>
          <div>
            <Text className="font-bold">{DELIVERY_COUNTRY?.name as string}</Text>
            <Text className="text-gray-400">
              {(DELIVERY_ADDRESS.city || DELIVERY_ADDRESS.region) as string} {(DELIVERY_ADDRESS.zip && ` · ${DELIVERY_ADDRESS.zip}`) as string}
            </Text>
          </div>
        </section>
        <Divider />
        {/* Shipping Info */}
        <section className="flex flex-col gap-2">
          <Text className="text-gray-400 mb-4">SHIPPING OPTIONS</Text>
          {QUOTE_DATA.parcels.envelopes?.map((item, index) => (
            <div
              key={item.parcelId! + index}
              className="flex gap-4 justify-between"
            >
              <Text className="">{item.quantity}x Envelope</Text>
              <Text className="text-gray-400">
                {`${item.weight ?? "_"} ${quoteSharedStore.unit.weight}`}
              </Text>
            </div>
          ))}
          {QUOTE_DATA.parcels.packages?.map((item, index) => (
            <div
              key={item.parcelId! + index}
              className="flex gap-4 justify-between"
            >
              <Text className="">{item.quantity}x Package</Text>
              <Text className="text-gray-400">
                {`${item.weight ?? "_"} ${quoteSharedStore.unit.weight}`}
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
                {`${item.weight ?? "_"} ${quoteSharedStore.unit.weight}`}
              </Text>
            </div>
          ))}
        </section>
        <Divider />
      </div>
      <section className="grid gap-4">
        {ORDER && OPTIONS && (
          <>
            {/* Cost Summery Info */}
            <section>
              <div className="flex gap-4 justify-between text-gray-400">
                <div className="flex flex-col gap-1 items-start">
                  <Text>Original Price</Text>
                </div>
                <Text className="line-through">{(ORDER.paymentDiscount?.discount?.original?.net! + ORDER.totalPrice?.original?.net!).toFixed(2)} {ORDER.paymentDiscount?.discount?.original?.currencyCode}</Text>
              </div>
              <div className="flex gap-4 justify-between text-gray-400">
                <div className="flex flex-col gap-1 items-start">
                  <Text>Discount</Text>
                </div>
                <Text>{ORDER.paymentDiscount?.discount?.original?.net} {ORDER.paymentDiscount?.discount?.original?.currencyCode}</Text>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex flex-col gap-1 items-start">
                  <Text className="font-bold">Total</Text>
                  <Text className="text-sm text-gray-400">incl. VAT</Text>
                </div>
                <Text className="font-bold text-blue-500">{ORDER.totalPrice?.original?.net} {ORDER.totalPrice?.original?.currencyCode}</Text>
              </div>
            </section>
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
                  <Link className="mx-1" href={"/terms-and-policy"}>
                    CargoSender’s T&C
                  </Link>
                  and chosen
                  <Link className="mx-1" href={OPTIONS.generalTermsAndConditionsLink! ?? ""}>
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
          <Button loading={getAQuote.isLoading} onClick={next} className="flex-1">
            Continue
          </Button>
        </div>
      </section>
    </aside>
  );
};

export default OrderSummerySection;