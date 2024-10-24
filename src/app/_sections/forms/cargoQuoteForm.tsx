import RadioButtonContainer from "@/components/inputs/buttonRadio";
import CountryWithRegionSelect from "@/components/inputs/countySelect";
import { LocationT, useCargoStore } from "@/store/cargo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Popover, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useGetAQuote } from "./useGetAQuote";

export type CargoQuoteForm = {
  collectFrom?: LocationT;
  deliveryTo?: LocationT;
  type?: "package" | "envelope" | "pallet";
};

export default function CargoQuoteForm() {
  const router = useRouter();
  const cargoStore = useCargoStore();
  const quoteForm = useForm<CargoQuoteForm>({
    initialValues: {
      collectFrom: cargoStore.parcels.pickupAddress || undefined,
      deliveryTo: cargoStore.parcels.deliveryAddress || undefined,
      type: undefined,
    },
    validate: {
      type: (v) => (v ? null : "This field is required"),
      collectFrom: (v) => (v ? null : "This field is required"),
      deliveryTo: (v) => (v ? null : "This field is required"),
    },
  });

  const getAQuote = useGetAQuote()

  const submitHandler = async (data: CargoQuoteForm) => {
    if (!data) return;
    if (!cargoStore) return;
    cargoStore.updatePickupAddress &&
      cargoStore.updatePickupAddress(data.collectFrom!);
    cargoStore.updateDeliveryAddress &&
      cargoStore.updateDeliveryAddress(data.deliveryTo!);
    if (data.type === "package")
      cargoStore.addPackage && cargoStore.addPackage();
    else if (data.type === "envelope")
      cargoStore.addEnvelope && cargoStore.addEnvelope();
    else if (data.type === "pallet")
      cargoStore.addPallet && cargoStore.addPallet();
    console.log(data.type, cargoStore.parcels);

    // get a quote
    // getAQuote.mutation(cargoStore.cargo)

    if (getAQuote.success)
      router.push("/cargo-quote");
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
