"use client";
import { QuoteApiSchema } from "@/app/api/orders/zod";
import RadioButtonContainer from "@/components/inputs/buttonRadio";
import CountrySelect, { countryType } from "@/components/inputs/countySelect";
import { useGetAQuote } from "@/hooks/useGetAQuote";
import { useQuotationDataStore } from "@/store/quote/quotation-data";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Popover, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import { z } from "zod";

type PreliminaryForm = {
  fromCountry: string;
  toCountry: string;
  type: string;
};

const zodSchema = z.object({
  fromCountry: z.string(),
  toCountry: z.string(),
  type: z.string(),
});

export default function CargoQuoteForm() {
  const router = useRouter();

  const quoteForm = useForm<PreliminaryForm>({
    validate: zodResolver(zodSchema),
  });

  const submitHandler = (data: PreliminaryForm) => {
    router.push(
      "/cargo-quote" +
        "?from=" +
        data.fromCountry +
        "&to=" +
        data.toCountry +
        "&type=" +
        data.type
    );
  };

  return (
    <form
      onSubmit={quoteForm.onSubmit(submitHandler)}
      className="grid grid-cols-12 gap-6 rounded-2xl bg-white p-4 md:m-4 md:p-8"
      action=""
    >
      <section className="col-span-12 flex items-end gap-4 md:col-span-6">
        <section className="grid gap-3">
          <Text className="!font-bold">Collect From</Text>
          <CountrySelect {...quoteForm.getInputProps("fromCountry")} />
        </section>
        <section className="grid gap-3">
          <Text className="!font-bold">Delivery To</Text>
          <CountrySelect {...quoteForm.getInputProps("toCountry")} />
        </section>
      </section>

      <section className="col-span-12 grid w-full gap-3 overflow-x-hidden md:col-span-6 lg:col-span-4">
        <div className="justify-left flex items-center gap-4">
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
      <div className="col-span-12 flex w-full items-end md:col-span-6 lg:col-span-2">
        <Button
          type="submit"
          color="blue"
          size="md"
          className="!w-full text-black"
          disabled={!quoteForm.isValid()}
        >
          Get a quote
        </Button>
      </div>
    </form>
  );
}
