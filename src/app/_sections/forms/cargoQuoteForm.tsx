import RadioButtonContainer from "@/components/inputs/buttonRadio";
import CountrySelect, { LocationSelectValue } from "@/components/inputs/countySelect";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Popover, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useShipmentStore } from "@/store/quote/shipment";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { parcelTypeEnum, useGetAQuoteDataStore } from "@/store/quote/quote";

export type CargoQuoteForm = {
  type?: parcelTypeEnum;
};

export default function CargoQuoteForm() {
  const router = useRouter();
  const quoteDataStore = useGetAQuoteDataStore();
  const shipmentStore = useShipmentStore()
  const quoteSharedStore = useQuoteSharedStore();
  const quoteForm = useForm<CargoQuoteForm>({
    initialValues: {
      type: "packages",
    },
    validate: {
      type: (v) => (v ? null : "This field is required"),
    },
  });

  const addressChangeHandler = (key: "delivery" | "pickup", value: LocationSelectValue) => {

    if (key === "delivery") {
      const { city, country, region } = value;
      quoteSharedStore.setCountry("deliveryCountry", country!)
      quoteSharedStore.setCity("deliveryCity", city!)
      quoteSharedStore.setRegion("deliveryRegion", region!)

    }
    else if (key === "pickup") {
      const { city, country, region } = value;
      quoteSharedStore.setCountry("pickupCountry", country!)
      quoteSharedStore.setCity("pickupCity", city!)
      quoteSharedStore.setRegion("pickupRegion", region!)
    }
  }

  const submitHandler = async (data: CargoQuoteForm) => {
    if (data.type) {
      quoteDataStore.resetParcels()
      quoteDataStore.addParcel(data.type)
      const { delivery, pickup } = quoteSharedStore.getLocations()
      const deliveryAddress = shipmentStore.mapLocationToShipmentAddress(delivery)
      const pickupAddress = shipmentStore.mapLocationToShipmentAddress(pickup)
      shipmentStore.setShipmentAddress("deliveryAddress", deliveryAddress)
      shipmentStore.setShipmentAddress("pickupAddress", pickupAddress)
      router.push("/cargo-quote")
    }

  };
  const pickupAddress = quoteSharedStore.getLocations().pickup
  const deliveryAddress = quoteSharedStore.getLocations().delivery
  return (
    <form
      onSubmit={quoteForm.onSubmit(submitHandler)}
      className="bg-white rounded-2xl p-8 m-4 grid gap-6"
      action=""
    >
      <section className="grid gap-3">
        <Text className="font-bold">Collect From</Text>
        <CountrySelect value={pickupAddress} onChange={(d) => addressChangeHandler("pickup", d)}
        />
      </section>
      <section className="grid gap-3">
        <Text className="font-bold">Delivery To</Text>
        <CountrySelect value={deliveryAddress} onChange={(d) => addressChangeHandler("delivery", d)}
        />
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
            { label: "Box", value: "packages" },
            { label: "Documents", value: "envelopes" },
            { label: "Pallet", value: "pallets" },
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
