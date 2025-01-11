"use client";
import { useContactStore } from "@/store/contact";
import { Icon } from "@iconify/react";
import { Alert, Checkbox, Text, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import OrderSummerySection from "./orderSummery";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { useShipmentStore } from "@/store/quote/shipment";
import { CitySelect } from "@/components/inputs/countySelect/citySelect";
import { RegionSelect } from "@/components/inputs/countySelect/regionSelect";
import { notifications } from "@mantine/notifications";
import LoginPage from "@/components/login/googleLogin";
import { useDisclosure } from "@mantine/hooks";
import useAuthStore from "@/store/auth";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { useEffect, useState } from "react";
import { QuoteResponseType } from "@/hooks/useGetAQuote";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { z } from "zod";

type AddressT = {
  fullName: string;
  address: string;
  addressExtra?: string;
  postalCode: number;
  phoneNumber: string;
  additionalNotes?: string;
};

const PHONE_REGEX =
  /^(\+?[1-9]{1,4})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}([-.\s]?\d{1,4}){1,3}$/;

const AddressSection = () => {
  const contactStore = useContactStore();
  const shipmentStore = useShipmentStore();
  const quoteSharedStore = useQuoteSharedStore();
  const { isAuthenticated } = useAuthStore();
  const quoteResponseStore = useQuoteResponseStore();
  const [loginDrawerOpened, { toggle: toggleLoginDrawer }] =
    useDisclosure(false);

  const [quoteData, setQuoteData] = useState<QuoteResponseType | null>(null);

  const PICKUP_COUNTRY = quoteSharedStore.pickupCountry;
  const DELIVERY_COUNTRY = quoteSharedStore.deliveryCountry;

  useEffect(() => {
    const data = quoteResponseStore.getQuoteResponse();
    if (data) {
      setQuoteData(data);
    }
  }, [quoteResponseStore]);

  const { pickupCountry, deliveryCountry } = quoteSharedStore;

  const pickUpAddressForm = useForm<AddressT>({
    initialValues: {
      fullName: "",
      address: shipmentStore.shipment.pickupAddress.street || "",
      addressExtra: "",
      postalCode: (shipmentStore.shipment.pickupAddress.zip || null) as number,
      phoneNumber: (shipmentStore.shipment.pickupContact?.phone ||
        "") as string,
      additionalNotes: "",
    },
    validate: {
      address: (v) => (v ? null : "This field is required."),
      postalCode: (v) => (v ? null : "This field is required."),
      phoneNumber: (v) => {
        if (!v) return "This field is required.";
        if (PHONE_REGEX.test(v)) return null;
        return "Invalid Phone Number";
      },
    },
  });

  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  const deliveryAddressForm = useForm<AddressT>({
    initialValues: {
      fullName: "",
      address: shipmentStore.shipment.deliveryAddress.street || "",
      addressExtra: "",
      postalCode: (shipmentStore.shipment.deliveryAddress.zip ||
        null) as number,
      phoneNumber: (shipmentStore.shipment.deliveryContact?.phone ||
        "") as string,
      additionalNotes: "",
    },
    validate: {
      address: (v) => (v ? null : "This field is required."),
      postalCode: (v) => (v ? null : "This field is required."),
      phoneNumber: (v) => {
        if (!v) return "This field is required.";
        if (PHONE_REGEX.test(v)) return null;
        return "Invalid phone number format. Please check and try again.";
      },
    },
  });

  useEffect(() => {
    const pickupExcludedDates =
      quoteData?.data?.options?.serviceTypes?.[0]?.pickupExcludedDates;
    if (pickupExcludedDates && pickupExcludedDates.length > 0) {
      const formattedDates = pickupExcludedDates.map(
        (dateString) => new Date(new Date(dateString).setHours(0, 0, 0, 0))
      );
      setAvailableDates(formattedDates);
    }
  }, [quoteData]);

  const pickUpDateForm = useForm<{ date: Date | null }>({
    initialValues: {
      date: null,
    },
    validate: {
      date: (value) => (value ? null : "This field is required."),
    },
  });

  const isDateAllowed = (date: Date) => {
    return availableDates.some(
      (allowedDate) =>
        allowedDate.toISOString().split("T")[0] ===
        date.toISOString().split("T")[0]
    );
  };

  function submitHandler() {
    pickUpAddressForm.validate();
    deliveryAddressForm.validate();
    pickUpDateForm.validate();

    if (
      !pickUpAddressForm.isValid() ||
      !deliveryAddressForm.isValid() ||
      !pickUpDateForm.isValid() ||
      !contactStore.isValid()
    ) {
      const firstErrorField = document.querySelector(
        ".mantine-TextInput-error, .mantine-DateInput-error"
      );
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth" });
      }
      return false;
    }

    const { delivery, pickup } = quoteSharedStore.getLocations();
    const deliveryAddress =
      shipmentStore.mapLocationToShipmentAddress(delivery);
    const pickupAddress = shipmentStore.mapLocationToShipmentAddress(pickup);
    shipmentStore.setShipmentAddress("deliveryAddress", deliveryAddress);
    shipmentStore.setShipmentAddress("pickupAddress", pickupAddress);
    if (pickUpDateForm.values.date) {
      shipmentStore.setPickupDate(pickUpDateForm.values.date);
    }

    shipmentStore.setShipmentContact("pickupContact", {
      name: pickUpAddressForm.values.fullName,
      email: contactStore.contactList[0].email,
      phone: pickUpAddressForm.values.phoneNumber,
    });
    shipmentStore.setShipmentContact("deliveryContact", {
      name: deliveryAddressForm.values.fullName,
      email: contactStore.contactList[1].email,
      phone: deliveryAddressForm.values.phoneNumber,
    });
    shipmentStore.setShipmentAddress("pickupAddress", {
      ...shipmentStore.shipment.pickupAddress,
      zip: pickUpAddressForm.values.postalCode,
      street: pickUpAddressForm.values.address,
    });

    shipmentStore.setShipmentAddress("deliveryAddress", {
      ...shipmentStore.shipment.deliveryAddress,
      zip: deliveryAddressForm.values.postalCode,
      street: deliveryAddressForm.values.address,
    });

    const contactList = contactStore.contactList.every((item) => {
      if (item.email.length > 0) return true;
    });
    if (!contactList) {
      notifications.show({
        title: "Error",
        message: "Email is required",
        color: "red",
      });
      return false;
    }

    return true;
  }

  const updatePickupCity = (d: any) => {
    quoteSharedStore.setCity("pickupCity", d);

    // Update pickupAddress based on the new city value
    const newPickupAddress = shipmentStore.mapLocationToShipmentAddress(
      quoteSharedStore.getLocations().pickup
    );
    shipmentStore.setShipmentAddress("pickupAddress", newPickupAddress);

    // Update deliveryAddress based on the new city value (if needed)
    const newDeliveryAddress = shipmentStore.mapLocationToShipmentAddress(
      quoteSharedStore.getLocations().delivery
    );
    shipmentStore.setShipmentAddress("deliveryAddress", newDeliveryAddress);
  };

  const updateDeliveryCity = (d: any) => {
    quoteSharedStore.setCity("deliveryCity", d);

    // Update deliveryAddress based on the new city value
    const newDeliveryAddress = shipmentStore.mapLocationToShipmentAddress(
      quoteSharedStore.getLocations().delivery
    );
    shipmentStore.setShipmentAddress("deliveryAddress", newDeliveryAddress);

    // Update pickupAddress based on the new city value (if needed)
    const newPickupAddress = shipmentStore.mapLocationToShipmentAddress(
      quoteSharedStore.getLocations().pickup
    );
    shipmentStore.setShipmentAddress("pickupAddress", newPickupAddress);
  };

  useEffect(() => {
    pickUpDateForm.validate();
    deliveryAddressForm.validate();
    pickUpAddressForm.validate();
  }, [
    pickUpAddressForm.values,
    deliveryAddressForm.values,
    pickUpDateForm.values,
  ]);

  console.log({
    pickUpAddressForm: pickUpAddressForm.isValid(),
    deliveryAddressForm: deliveryAddressForm.isValid(),
    pickUpDateForm: pickUpDateForm.isValid(),
    contactStore: contactStore.isValid(),
  });

  return (
    <>
      <form className="flex-1">
        <article className="grid gap-8">
          <article className="cargo-quote-section grid gap-4">
            <div className="grid gap-2">
              <Title order={3}>Pick-up & Delivery</Title>
              {!isAuthenticated && (
                <Alert
                  variant="light"
                  color="blue.3"
                  radius="sm"
                  p={8}
                  icon={
                    <Icon
                      className="text-xl text-blue-500"
                      icon="mdi:about-circle-outline"
                    />
                  }
                >
                  <span className="text-blue-500">
                    Returning Customers?
                    <span
                      onClick={toggleLoginDrawer}
                      className="mx-1 cursor-pointer underline"
                    >
                      login
                    </span>
                    {loginDrawerOpened && (
                      <LoginPage
                        opened={loginDrawerOpened}
                        onClose={toggleLoginDrawer}
                      />
                    )}
                    to log in and access your saved information
                  </span>
                </Alert>
              )}
            </div>
            {/* PICK UP ADDRESS */}
            <section className="grid gap-2">
              <Title order={4}>Pick-up Address</Title>

              <div className="items-flex-start grid gap-4 sm:grid-cols-2">
                {(!pickupCountry?.requiresRegion ||
                  pickupCountry?.requiresCity ||
                  true) && (
                  <CitySelect
                    value={quoteSharedStore.pickupCity!}
                    countryCode={pickupCountry?.code!}
                    required
                    onChange={(d) => updatePickupCity(d)}
                  />
                )}
                {pickupCountry?.requiresRegion && (
                  <RegionSelect
                    value={quoteSharedStore.pickupRegion!}
                    countryCode={pickupCountry?.code!}
                    required
                    onChange={(d) =>
                      quoteSharedStore.setRegion("pickupRegion", d)
                    }
                  />
                )}
                <TextInput
                  required
                  label={<span className="form-label">Zip/Postal Code</span>}
                  placeholder="112366"
                  classNames={{
                    input: "!placeholder-gray-400",
                  }}
                  {...pickUpAddressForm.getInputProps("postalCode")}
                />
                <TextInput
                  required
                  label={<span className="form-label">Address</span>}
                  placeholder="Street Address"
                  classNames={{
                    input: "!placeholder-gray-400",
                  }}
                  {...pickUpAddressForm.getInputProps("address")}
                />
                <TextInput
                  label={<span className="form-label">Detail Address</span>}
                  placeholder="Apt, Floor, Suite, etc. (optional)"
                  classNames={{
                    input: "!placeholder-gray-400",
                  }}
                  {...pickUpAddressForm.getInputProps("addressExtra")}
                />

                <div>
                  <div className="flex items-end gap-4">
                    <TextInput
                      required
                      className="flex-1"
                      type="email"
                      placeholder="eg:john@domain.com"
                      classNames={{
                        input: "!placeholder-gray-400",
                      }}
                      label={
                        <span className="form-label">Sender Email Address</span>
                      }
                      onChange={(e) =>
                        contactStore.editEmail(0, e.target.value!)
                      }
                      error={
                        contactStore.contactList[0].error
                          ? "Invalid email"
                          : null
                      }
                    />
                  </div>
                  <p>
                    <span className="form-description">
                      This email to receive all order and delivery updates
                    </span>
                  </p>
                  <Checkbox
                    className="pt-2"
                    label={
                      <span className="form-label">
                        Opt-in for newsletter emails
                      </span>
                    }
                    checked={contactStore.contactList[0].newsletterSubscription}
                    onChange={(e) =>
                      contactStore.editSubscription(0, e.target.checked!)
                    }
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[12px] font-bold text-gray-950">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    inputClass="!w-full border !border-[#e5e7eb]"
                    country={"us"}
                    value={PICKUP_COUNTRY?.code}
                    {...pickUpAddressForm.getInputProps("phoneNumber")}
                  />
                </div>
              </div>
            </section>
            {/* DELIVERY ADDRESS */}
            <section className="grid gap-2">
              <Title order={4}>Delivery Address</Title>

              <div className="grid items-end gap-4 sm:grid-cols-2">
                {(deliveryCountry?.requiresRegion ||
                  deliveryCountry?.requiresCity ||
                  true) && (
                  <CitySelect
                    countryCode={deliveryCountry?.code!}
                    value={quoteSharedStore.deliveryCity!}
                    required
                    onChange={(d) => updateDeliveryCity(d)}
                  />
                )}
                {deliveryCountry?.requiresRegion && (
                  <RegionSelect
                    countryCode={deliveryCountry?.code!}
                    value={quoteSharedStore.deliveryRegion!}
                    required
                    onChange={(d) =>
                      quoteSharedStore.setRegion("deliveryRegion", d)
                    }
                  />
                )}
                <TextInput
                  required
                  label={<span className="form-label">Zip/Postal Code</span>}
                  placeholder="112366"
                  classNames={{
                    input: "!placeholder-gray-400",
                  }}
                  {...deliveryAddressForm.getInputProps("postalCode")}
                />
                <TextInput
                  required
                  label={<span className="form-label">Address</span>}
                  placeholder="Street Address"
                  classNames={{
                    input: "!placeholder-gray-400",
                  }}
                  {...deliveryAddressForm.getInputProps("address")}
                />
                <TextInput
                  className="placeholder-gray-900"
                  label={<span className="form-label">Detail Address</span>}
                  placeholder="Apt, Floor, Suite, etc. (optional)"
                  classNames={{
                    input: "!placeholder-gray-400",
                  }}
                  {...deliveryAddressForm.getInputProps("addressExtra")}
                />
                <div>
                  <div className="flex items-end gap-4">
                    <TextInput
                      required
                      className="flex-1"
                      type="email"
                      placeholder="eg:john@domain.com"
                      classNames={{
                        input: "!placeholder-gray-400",
                      }}
                      label={
                        <span className="form-label">
                          Receiver Email Address
                        </span>
                      }
                      onChange={(e) =>
                        contactStore.editEmail(1, e.target.value!)
                      }
                      error={
                        contactStore.contactList[1].error
                          ? "Invalid email"
                          : null
                      }
                    />
                  </div>
                  <span className="form-description">
                    This email to receive all order and delivery updates
                  </span>
                  <Checkbox
                    className="pt-2"
                    label={
                      <span className="form-label">
                        Opt-in for newsletter emails
                      </span>
                    }
                    checked={contactStore.contactList[1].newsletterSubscription}
                    onChange={(e) =>
                      contactStore.editSubscription(1, e.target.checked!)
                    }
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[12px] font-bold text-gray-950">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    inputClass="!w-full border !border-[#e5e7eb]"
                    country={"us"}
                    value={DELIVERY_COUNTRY?.code}
                    {...deliveryAddressForm.getInputProps("phoneNumber")}
                  />
                </div>
              </div>
            </section>
          </article>
          {/* PICKUP DATE */}
          <section className="cargo-quote-section grid gap-2">
            <Title order={3}>Pick-up Date</Title>
            <DateInput
              required
              placeholder="Select a date"
              classNames={{
                input: "!placeholder-gray-400",
              }}
              leftSection={<Icon icon="uiw:date" />}
              rightSection={<Icon icon="mingcute:down-line" />}
              label={<span className="form-label">Choose a date</span>}
              minDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
              {...pickUpDateForm.getInputProps("date")}
              excludeDate={(date) => isDateAllowed(date)}
            />
          </section>
        </article>
      </form>
      <OrderSummerySection
        isLoading={false}
        isNextDisabled={
          !pickUpAddressForm.isValid() ||
          !deliveryAddressForm.isValid() ||
          !pickUpDateForm.isValid() ||
          !contactStore.isValid()
        }
        submitHandler={submitHandler}
      />
    </>
  );
};

export default AddressSection;
