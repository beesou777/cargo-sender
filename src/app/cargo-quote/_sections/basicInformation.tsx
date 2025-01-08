"use client";
import CargoInput from "@/components/inputs/cargo";
import CountrySelect, { countryType } from "@/components/inputs/countySelect";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect } from "react";
import OrderSummerySection from "./orderSummery";
import { useFormContext } from "../form/form-context";
import { v4 as uuidv4 } from "uuid";
import { useGetAQuote } from "@/hooks/useGetAQuote";
import { QuoteApiSchema } from "@/app/api/orders/zod";

type GetEmptyEntryProps = "envelopes" | "packages" | "pallets";
export const getEmptyEntry = (type: GetEmptyEntryProps): any => {
  return {
    parcelId: uuidv4(),
    weight: 0,
    quantity: 1,
    ...((type === "packages" || type === "pallets") && {
      length: 0,
      width: 0,
      height: 0,
      content: "",
      value: 0,
    }),
  };
};

const BaseInformationSection = () => {
  const form = useFormContext();

  const [opened, { open, close }] = useDisclosure(false);

  const pickupCountryCode = form.values.shipment.pickupAddress.country;
  const deliveryCountryCode = form.values.shipment.deliveryAddress.country;

  const countryFlags = {
    Collect: pickupCountryCode
      ? `flagpack:${pickupCountryCode.toLocaleLowerCase()}`
      : "carbon:flag-filled",
    Deliver: deliveryCountryCode
      ? `flagpack:${deliveryCountryCode.toLocaleLowerCase()}`
      : "carbon:flag-filled",
  };

  function submitHandler() {
    return false;
  }

  return (
    <>
      <Modal title="Update Delivery" opened={opened} onClose={close}>
        <form className="grid gap-6" action="">
          <section className="grid gap-3">
            <Text className="font-bold">Collect From</Text>
            <CountrySelect
              {...form.getInputProps("shipment.pickupAddress.country")}
            />
          </section>
          <section className="grid gap-3">
            <Text className="font-bold">Delivery To</Text>
            <CountrySelect
              {...form.getInputProps("shipment.deliveryAddress.country")}
            />
          </section>
          <Button type="submit">Update</Button>
        </form>
      </Modal>

      <div className="flex-1">
        <article className="grid gap-8">
          <section className="cargo-quote-section grid gap-4">
            <div className="flex justify-between gap-4">
              <Title order={3} className="font-semibold">
                Delivery
              </Title>
              <ActionIcon onClick={open} radius="lg" variant="light">
                <Icon icon="material-symbols:edit" />
              </ActionIcon>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text>Collect From</Text>
                <div className="with-icon mt-2">
                  <Icon className="text-xl" icon={countryFlags.Collect} />
                  <Text className="font-semibold">
                    {pickupCountryCode || "Unknown"}
                    <span className="mx-1 font-light text-gray-600">
                      ({pickupCountryCode || "Unknown"})
                    </span>
                  </Text>
                </div>
              </div>
              <div>
                <Text>Deliver To</Text>
                <div className="with-icon mt-2">
                  <Icon className="text-xl" icon={countryFlags.Deliver} />
                  <Text className="font-semibold">
                    {deliveryCountryCode || "Unknown"}
                    <span className="mx-1 font-light text-gray-600">
                      ({deliveryCountryCode || "Unknown"})
                    </span>
                  </Text>
                </div>
              </div>
            </div>
          </section>

          <article className="grid gap-4">
            {/* ENVELOPES */}
            {form?.values.parcels.envelopes?.map((item, index) => (
              <CargoInput
                onDelete={() => form.removeListItem(`parcels.envelops`, index)}
                onChange={(data) => {
                  form.replaceListItem(`parcels.envelops`, index, data);
                }}
                key={index + item.parcelId!}
                index={index}
                {...item}
                type={"envelopes"}
              />
            ))}
            {/* PACKAGE */}
            {form?.values.parcels.packages?.map((item, index) => (
              <CargoInput
                onDelete={() => form.removeListItem(`parcels.packages`, index)}
                onChange={(data) => {
                  form.replaceListItem(`parcels.packages`, index, data);
                }}
                key={index + item.parcelId!}
                {...item}
                index={index}
                type="packages"
              />
            ))}
            {/* PALLET */}
            {form?.values.parcels.pallets?.map((item, index) => (
              <CargoInput
                onDelete={() => form.removeListItem(`parcels.pallets`, index)}
                onChange={(data) => {
                  form.replaceListItem(`parcels.pallets`, index, data);
                }}
                key={index + item.parcelId!}
                {...item}
                index={index}
                type="pallets"
              />
            ))}

            <div className="mt-4 grid grid-cols-3 gap-8">
              {form?.values.parcels?.envelopes?.length !== 0 ? (
                <Button
                  radius="md"
                  leftSection={
                    <Icon
                      className="text-lg text-blue-500"
                      icon="rivet-icons:plus"
                    />
                  }
                  onClick={() =>
                    form.insertListItem(
                      "parcels.envelopes",
                      getEmptyEntry("envelopes")
                    )
                  }
                  className="text-gray-800"
                  variant="white"
                >
                  Add Envelope
                </Button>
              ) : (
                <>
                  {form?.values.parcels.packages?.length === 0 &&
                    form?.values.parcels.pallets?.length === 0 && (
                      <Button
                        radius="md"
                        leftSection={
                          <Icon
                            className="text-lg text-blue-500"
                            icon="rivet-icons:plus"
                          />
                        }
                        onClick={() =>
                          form.insertListItem(
                            "parcels.envelopes",
                            getEmptyEntry("envelopes")
                          )
                        }
                        className="text-gray-800"
                        variant="white"
                      >
                        Add Envelope
                      </Button>
                    )}
                  <Button
                    radius="md"
                    leftSection={
                      <Icon
                        className="text-lg text-blue-500"
                        icon="rivet-icons:plus"
                      />
                    }
                    onClick={() =>
                      form.insertListItem(
                        "parcels.packages",
                        getEmptyEntry("packages")
                      )
                    }
                    className="text-gray-800"
                    variant="white"
                  >
                    Add Package
                  </Button>
                  <Button
                    radius="md"
                    leftSection={
                      <Icon
                        className="text-lg text-blue-500"
                        icon="rivet-icons:plus"
                      />
                    }
                    onClick={() =>
                      form.insertListItem(
                        "parcels.pallets",
                        getEmptyEntry("pallets")
                      )
                    }
                    className="text-gray-800"
                    variant="white"
                  >
                    Add Pallet
                  </Button>
                </>
              )}
            </div>

            {/* {isLoadingQuoteData && !quoteData ? (
              <div className="cargo-quote-section">
                <div className="grid gap-4">
                  <div>
                    <Skeleton height={20} width="30%" radius="sm" />
                    <Skeleton height={16} width="50%" mt="sm" radius="sm" />
                  </div>

                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={`service-type-skeleton-${index}`}
                      height={80}
                      radius="md"
                      className="rounded-xl shadow-sm"
                    />
                  ))}
                </div>
              </div>
            ) :  (
              <section className="cargo-quote-section">
                <div className="grid gap-4">
                  <div>
                    <Title order={2}>Choose Service Type</Title>
                    <Text className="mt-2 text-gray-400">
                      Choose a service type
                    </Text>
                  </div>
                  {OPTIONS.serviceTypes.map((service, index) => (
                    <CheckboxCard
                      key={`service-type-${index}`}
                      className="rounded-xl shadow-sm"
                      tabIndex={0}
                      onClick={() => updateService(service)}
                    >
                      <div className="flex items-center gap-6 p-6">
                        <Checkbox.Indicator
                          radius="lg"
                          size="md"
                          checked={QUOTE_DATA.serviceType === service.name!}
                        />
                        <div className="grid flex-1">
                          <div className="flex items-center justify-between">
                            <Text className="text-lg font-bold">
                              {snakeCaseToString(service.name!)}
                            </Text>
                            <Text className="text-green-500">{`${((service.price?.original?.net || 0) * 1.5).toFixed(2)} ${service.price?.original?.currencyCode}`}</Text>
                          </div>
                        </div>
                      </div>
                    </CheckboxCard>
                  ))}
                </div>
              </section>
            ) : (
              <></>
            )} */}
          </article>
        </article>
      </div>
      <OrderSummerySection submitHandler={submitHandler} />
    </>
  );
};

export default BaseInformationSection;
