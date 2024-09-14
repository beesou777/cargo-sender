import { UNIT_VALUE, useCargoStore } from "@/store/cargo";
import { useSteeper } from "@/store/step";
import { Icon } from "@iconify/react";
import { Button, Checkbox, Divider, Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

type OrderSummerySectionT = {
  submitHandler?: () => boolean;
};

const OrderSummerySection = (
  { submitHandler }: OrderSummerySectionT = { submitHandler: () => true }
) => {
  const [shippingTerms, setShippingTerms] = React.useState(false);
  const [cargoTerms, setCargoTerms] = React.useState(false);

  const { activeStep, setStep } = useSteeper();
  const { cargo } = useCargoStore();
  const { collectFrom, deliveryTo, packages, pallets } = cargo;

  async function next() {
    if (submitHandler && !submitHandler()) {
      return;
    }
    setStep(activeStep + 1);
  }
  function previous() {
    if (activeStep) setStep(activeStep - 1);
  }
  return (
    <aside className="bg-white p-6 w-full rounded-xl flex flex-col gap-[4rem] justify-between md:max-w-[350px] md:min-h-[80svh]">
      <div className="grid gap-4">
        <Title order={4}>Order Summery</Title>
        {/* Location */}
        <section className="flex flex-col gap-2">
          <Text className="text-gray-400">PICKUP</Text>
          <div>
            <Text className="font-bold">{collectFrom?.country.name}</Text>
            <Text className="text-gray-400">
              {collectFrom?.location.name} - {collectFrom?.location.regionId}
            </Text>
          </div>
          <div>
            <Text className="font-bold">
              {deliveryTo?.country.name as string}
            </Text>
            <Text className="text-gray-400">
              {deliveryTo?.location.name} - {deliveryTo?.location.regionId}
            </Text>
          </div>
        </section>
        <Divider />
        {/* Shipping Info */}
        <section className="flex flex-col gap-2">
          <Text className="text-gray-400">SHIPPING OPTIONS</Text>
          {packages?.map((item, index) => (
            <div
              key={item.weight + index}
              className="flex gap-4 justify-between"
            >
              <Text className="">{item.noOfItems}x Package</Text>
              <Text className="text-gray-400">
                {`${item.weight} ${UNIT_VALUE[item.unit].weight}`}
              </Text>
            </div>
          ))}
          {pallets?.map((item, index) => (
            <div
              key={item.weight + index}
              className="flex gap-4 justify-between"
            >
              <Text className="">{item.noOfItems}x Pallet</Text>
              <Text className="text-gray-400">
                {`${item.weight} ${UNIT_VALUE[item.unit].weight}`}
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
