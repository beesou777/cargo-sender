import RadioButtonContainer from "@/components/inputs/buttonRadio";
import CountryWithRegionSelect from "@/components/inputs/countySelect";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Popover, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { ShipmentAddressType, useShipmentStore } from "@/store/quote/shipment";
import { useGetAQuote } from "@/hooks/useGetAQuote";

export type CargoQuoteForm = {
  pickupFrom?: ShipmentAddressType;
  deliveryTo?: ShipmentAddressType;
  type?: "package" | "envelope" | "pallet";
};

export default function CargoQuoteForm() {
  const router = useRouter();
  const cargoStore = useShipmentStore();
  const quoteForm = useForm<CargoQuoteForm>({
    initialValues: {
      pickupFrom: cargoStore.shipment?.pickupAddress || undefined,
      deliveryTo: cargoStore.shipment?.deliveryAddress || undefined,
      type: undefined,
    },
    validate: {
      type: (v) => (v ? null : "This field is required"),
      pickupFrom: (v) => (v ? null : "This field is required"),
      deliveryTo: (v) => (v ? null : "This field is required"),
    },
  });

  const getAQuote = useGetAQuote()

  const submitHandler = async (data: CargoQuoteForm) => {
  };
  return (
    <form
      onSubmit={quoteForm.onSubmit(submitHandler)}
      className="bg-white rounded-2xl p-8 m-4 grid gap-6"
      action=""
    >
      <section className="grid gap-3">
        <Text className="font-bold">Collect From</Text>
        <CountryWithRegionSelect {...quoteForm.getInputProps("collectFrom")} />
      </section>
      <section className="grid gap-3">
        <Text className="font-bold">Delivery To</Text>
        <CountryWithRegionSelect {...quoteForm.getInputProps("deliveryTo")} />
      </section>

      <section className="grid gap-3">
        <div className="flex justify-between items-center">
          <Text className="font-bold">Choose a service</Text>
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
          options={[
            { label: "Documents", value: "package" },
            { label: "Box", value: "envelope" },
            { label: "Pallet", value: "pallet" },
          ]}
          {...quoteForm.getInputProps("type")}
        />
      </section>
      <Button type="submit" color="yellow.4" className="mt-4 text-black">
        Get a quote
      </Button>
    </form>
  );
}
