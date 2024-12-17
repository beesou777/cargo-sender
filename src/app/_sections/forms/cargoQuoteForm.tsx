"use client";
import RadioButtonContainer from "@/components/inputs/buttonRadio";
import CountrySelect, { countryType } from "@/components/inputs/countySelect";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Popover, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { parcelTypeEnum, useGetAQuoteDataStore } from "@/store/quote/quote";

export type CargoQuoteForm = {
  type?: parcelTypeEnum;
};

export default function CargoQuoteForm() {
  const router = useRouter();
  const quoteDataStore = useGetAQuoteDataStore();
  const quoteSharedStore = useQuoteSharedStore();

  const quoteForm = useForm<CargoQuoteForm>({
    initialValues: {
      type: "packages",
    },
    validate: {
      type: (v) => (v ? null : "This field is required"),
    },
  });

  const addressChangeHandler = (
    key: "delivery" | "pickup",
    value: countryType,
  ) => {
    if (key === "delivery") {
      quoteSharedStore.setCountry("deliveryCountry", value!);
    } else if (key === "pickup") {
      quoteSharedStore.setCountry("pickupCountry", value!);
    }
  };

  const submitHandler = async (data: CargoQuoteForm) => {
    if (data.type) {
      quoteDataStore.resetParcels();
      quoteDataStore.addParcel(data.type);
      router.push("/cargo-quote");
    }
  };
  const pickupAddress = quoteSharedStore.getLocations().pickup;
  const deliveryAddress = quoteSharedStore.getLocations().delivery;
  return (
    <form
      onSubmit={quoteForm.onSubmit(submitHandler)}
      className="bg-white rounded-2xl md:p-8 p-4 md:m-4 grid gap-6 grid-cols-12"
      action=""
    >
      <section className="flex gap-4 items-end md:col-span-6 col-span-12">
        <section className="grid gap-3">
          <Text className="!font-bold">Collect From</Text>
          <CountrySelect
            value={pickupAddress.country}
            onChange={(d) => addressChangeHandler("pickup", d)}
          />
        </section>
        <section className="grid gap-3">
          <Text className="!font-bold">Delivery To</Text>
          <CountrySelect
            value={deliveryAddress.country}
            onChange={(d) => addressChangeHandler("delivery", d)}
          />
        </section>
      </section>

      <section className="grid gap-3 w-full overflow-x-hidden lg:col-span-4 md:col-span-6 col-span-12">
        <div className="flex justify-left gap-4 items-center">
          <Text className="!font-bold">Choose a service</Text>
          <Popover shadow="md">
            <Popover.Target>
              <Icon
                className="text-xl text-gray-500"
                icon="mdi:about-circle-outline"
              />
            </Popover.Target>
            <Popover.Dropdown>Select a service type.</Popover.Dropdown>
          </Popover>
        </div>
        <RadioButtonContainer
          className="!rounded-md"
          options={[
            { label: "Documents", value: "envelopes" },
            { label: "Pallet", value: "pallets" },
            { label: "Box", value: "packages" },
          ]}
          {...quoteForm.getInputProps("type")}
        />
      </section>
      <div className="lg:col-span-2 md:col-span-6 col-span-12 flex items-end w-full">
        <Button
          type="submit"
          color="blue"
          size="md"
          className=" text-black !w-full"
        >
          Get a quote
        </Button>
      </div>
    </form>
  );
}
