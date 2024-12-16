"use client"
import { useContactStore } from "@/store/contact";
import { Icon } from "@iconify/react";
import {
  Alert,
  Button,
  Checkbox,
  NumberInput,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import Link from "next/link";
import OrderSummerySection from "./orderSummery";
import { useQuoteSharedStore } from "@/store/quote/quoteSharedStore";
import { useShipmentStore } from "@/store/quote/shipment";
import { CitySelect } from "@/components/inputs/countySelect/citySelect";
import { RegionSelect } from "@/components/inputs/countySelect/regionSelect";
import { notifications } from "@mantine/notifications";

type AddressT = {
  fullName: string;
  address: string;
  addressExtra?: string;
  postalCode: number;
  phoneNumber: string;
  additionalNotes?: string;
};

const PHONE_REGEX = /^(\+?[1-9]{1,4})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}([-.\s]?\d{1,4}){1,3}$/

const AddressSection = () => {
  const contactStore = useContactStore();

  const shipmentStore = useShipmentStore();
  const quoteSharedStore = useQuoteSharedStore();
  const { pickupCountry, deliveryCountry } = quoteSharedStore
  const pickUpAddressForm = useForm<AddressT>({
    initialValues: {
      fullName: "",
      address: shipmentStore.shipment.pickupAddress.street || "",
      addressExtra: "",
      postalCode: (shipmentStore.shipment.pickupAddress.zip || null) as number,
      phoneNumber: (shipmentStore.shipment.pickupContact?.phone || "") as string,
      additionalNotes: "",
    },
    validate: {
      address: (v) => (v ? null : "This field is required."),
      postalCode: (v) => (v ? null : "This field is required."),
      phoneNumber: (v) => {
        if (!v) return "This field is required."
        if (PHONE_REGEX.test(v)) return null
        return "Invalid Phone Number"
      },
    },
  });

  const deliveryAddressForm = useForm<AddressT>({
    initialValues: {
      fullName: "",
      address: shipmentStore.shipment.deliveryAddress.street || "",
      addressExtra: "",
      postalCode: (shipmentStore.shipment.deliveryAddress.zip || null) as number,
      phoneNumber: (shipmentStore.shipment.deliveryContact?.phone || "") as string,
      additionalNotes: "",
    },
    validate: {
      address: (v) => (v ? null : "This field is required."),
      postalCode: (v) => (v ? null : "This field is required."),
      phoneNumber: (v) => {
        if (!v) return "This field is required."
        if (PHONE_REGEX.test(v)) return null
        return "Invalid phone number format. Please check and try again.";
      },
    },
  });

  const pickUpDateForm = useForm<{ date: Date }>({
    initialValues: {
      date: new Date(Date.now() + (3600 * 1000 * 24 * 2))
    },
    validate: {
      date: (v) => (v ? null : "This field is required."),
    },
  });

  function submitHandler() {
    pickUpAddressForm.validate();
    deliveryAddressForm.validate();
    pickUpDateForm.validate();

    if (
      !pickUpAddressForm.isValid() ||
      !deliveryAddressForm.isValid() ||
      !pickUpDateForm.isValid() ||
      !contactStore.isValid()
    )
      return false;


    const { delivery, pickup } = quoteSharedStore.getLocations()
    const deliveryAddress = shipmentStore.mapLocationToShipmentAddress(delivery)
    const pickupAddress = shipmentStore.mapLocationToShipmentAddress(pickup)
    shipmentStore.setShipmentAddress("deliveryAddress", deliveryAddress)
    shipmentStore.setShipmentAddress("pickupAddress", pickupAddress)
    // SET SHIPMENT STORE
    shipmentStore.setPickupDate(pickUpDateForm.values.date)

    shipmentStore.setShipmentContact("pickupContact", {
      name: pickUpAddressForm.values.fullName,
      email: contactStore.contactList[0].email,
      phone: pickUpAddressForm.values.phoneNumber
    })
    shipmentStore.setShipmentContact("deliveryContact", {
      name: deliveryAddressForm.values.fullName,
      email: contactStore.contactList[1].email,
      phone: deliveryAddressForm.values.phoneNumber
    })
    shipmentStore.setShipmentAddress("pickupAddress", {
      ...shipmentStore.shipment.deliveryAddress,
      zip: pickUpAddressForm.values.postalCode,
      street: pickUpAddressForm.values.address
    })

    shipmentStore.setShipmentAddress("deliveryAddress", {
      ...shipmentStore.shipment.deliveryAddress,
      zip: deliveryAddressForm.values.postalCode,
      street: deliveryAddressForm.values.address
    })

    const contactList = contactStore.contactList.every((item) => {
      if(item.email.length > 0) return true
    })
    if(!contactList){
      notifications.show({
        title: "Error",
        message: "All contacts must be filled in.",
        color: "red",
      })
      return false
    }

    return true;
  }

  const updatePickupCity = (d: any) => {
    quoteSharedStore.setCity("pickupCity", d);

    // Update pickupAddress based on the new city value
    const newPickupAddress = shipmentStore.mapLocationToShipmentAddress(quoteSharedStore.getLocations().pickup);
    shipmentStore.setShipmentAddress("pickupAddress", newPickupAddress);

    // Update deliveryAddress based on the new city value (if needed)
    const newDeliveryAddress = shipmentStore.mapLocationToShipmentAddress(quoteSharedStore.getLocations().delivery);
    shipmentStore.setShipmentAddress("deliveryAddress", newDeliveryAddress);
  };

  const updateDeliveryCity = (d: any) => {
    quoteSharedStore.setCity("deliveryCity", d);

    // Update deliveryAddress based on the new city value
    const newDeliveryAddress = shipmentStore.mapLocationToShipmentAddress(quoteSharedStore.getLocations().delivery);
    shipmentStore.setShipmentAddress("deliveryAddress", newDeliveryAddress);


    // Update pickupAddress based on the new city value (if needed)
    const newPickupAddress = shipmentStore.mapLocationToShipmentAddress(quoteSharedStore.getLocations().pickup);
    shipmentStore.setShipmentAddress("pickupAddress", newPickupAddress);
  }

  return (
    <>
      <form className="flex-1">
        <article className="grid gap-8">
          <article className="cargo-quote-section grid gap-4 ">
            <div className="grid gap-2">
              <Title order={3}>Pick-up & Delivery</Title>
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
                  <Link className="mx-1" href="/login">
                    Click here
                  </Link>
                  to log in and access your saved information
                </span>
              </Alert>
            </div>
            {/* PICK UP ADDRESS */}
            <section className="grid gap-2">
              <Title order={4}>Pick-up Address</Title>
              {/* <TextInput
              required
                label={<span className="form-label">Full Name</span>}
                placeholder="Person or Company"
                {...pickUpAddressForm.getInputProps("fullName")}
              /> */}
              <div className="grid sm:grid-cols-2 gap-4 items-end">

                {(!pickupCountry?.requiresRegion || pickupCountry?.requiresCity || true) &&
                  <CitySelect value={quoteSharedStore.pickupCity!} countryCode={pickupCountry?.code!} required onChange={(d) => updatePickupCity(d)} />}
                {pickupCountry?.requiresRegion &&
                  <RegionSelect value={quoteSharedStore.pickupRegion!} countryCode={pickupCountry?.code!} required onChange={(d) => quoteSharedStore.setRegion("pickupRegion", d)} />
                }
                <TextInput
                  required
                  label={<span className="form-label">Zip/Postal Code</span>}
                  placeholder="112366"
                  {...pickUpAddressForm.getInputProps("postalCode")}
                />
                <TextInput
                  required
                  label={<span className="form-label">Address</span>}
                  placeholder="Street Address"
                  {...pickUpAddressForm.getInputProps("address")}
                />
                <TextInput
                  label={<span className="form-label">Detail Address</span>}
                  placeholder="Apt, Floor, Suite, etc. (optional)"
                  {...pickUpAddressForm.getInputProps("addressExtra")}
                />
                <TextInput
                  required
                  label={<span className="form-label">Phone Number</span>}
                  className="w-full"
                  placeholder="22 333 4444"
                  {...pickUpAddressForm.getInputProps("phoneNumber")}
                />
              </div>
              {/* <Textarea
                rows={5}
                label={
                  <span className="form-label">
                    Additional Notes (optional)
                  </span>
                }
                placeholder="You can add in some additional notes here. This will not be sent to the carrier automatically"
                {...pickUpAddressForm.getInputProps("additionalNotes")}
              /> */}
            </section>
            {/* DELIVERY ADDRESS */}
            <section className="grid gap-2">
              <Title order={4}>Delivery Address</Title>
              {/* <TextInput
              required
                label={<span className="form-label">Full Name</span>}
                placeholder="Person or Company"
                {...deliveryAddressForm.getInputProps("fullName")}
              /> */}
              <div className="grid sm:grid-cols-2 gap-4 items-end">
                {(deliveryCountry?.requiresRegion || deliveryCountry?.requiresCity || true) &&
                  <CitySelect countryCode={deliveryCountry?.code!} value={quoteSharedStore.deliveryCity!} required onChange={(d) => updateDeliveryCity(d)} />}
                {deliveryCountry?.requiresRegion &&
                  <RegionSelect countryCode={deliveryCountry?.code!} value={quoteSharedStore.deliveryRegion!} required onChange={(d) => quoteSharedStore.setRegion("deliveryRegion", d)} />
                }
                <TextInput
                  required
                  label={<span className="form-label">Zip/Postal Code</span>}
                  placeholder="112366"
                  {...deliveryAddressForm.getInputProps("postalCode")}
                />
                <TextInput
                  required
                  label={<span className="form-label">Address</span>}
                  placeholder="Street Address"
                  {...deliveryAddressForm.getInputProps("address")}
                />
                <TextInput
                  label={<span className="form-label">Detail Address</span>}
                  placeholder="Apt, Floor, Suite, etc. (optional)"
                  {...deliveryAddressForm.getInputProps("addressExtra")}
                />
                <TextInput
                  required
                  label={<span className="form-label">Phone Number</span>}
                  className="w-full"
                  placeholder="22 333 4444"
                  {...deliveryAddressForm.getInputProps("phoneNumber")}
                />
              </div>
              {/* <Textarea
                rows={5}
                label={
                  <span className="form-label">
                    Additional Notes (optional)
                  </span>
                }
                placeholder="You can add in some additional notes here. This will not be sent to the carrier automatically"
                {...deliveryAddressForm.getInputProps("additionalNotes")}
              /> */}
            </section>
          </article>
          {/* CONTACT DETAILS */}
          <section className="cargo-quote-section grid gap-4">
            <Title order={3}>Contact Details</Title>
            <Text>
              Choose the email that will send and receive the order and delivery updates
            </Text>
            <>
              <div
                className="flex gap-4 items-end"
              >
                <TextInput
                  required
                  className="flex-1"
                  type="email"
                  placeholder="eg:john@domain.com"
                  label={
                    <span className="form-label">
                      Sender Email Address
                    </span>
                  }
                  description={
                    <span className="form-description">
                      This email to receive all order and delivery updates
                    </span>
                  }
                  onChange={(e) =>
                    contactStore.editEmail(0, e.target.value!)
                  }
                  error={contactStore.contactList[0].error ? "Invalid email" : null}
                />
              </div>
              <Checkbox
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
            </>
            <>
              <div
                className="flex gap-4 items-end mt-4"
              >
                <TextInput
                  required
                  className="flex-1"
                  type="email"
                  placeholder="eg:john@domain.com"
                  label={
                    <span className="form-label">
                      Receiver Email Address
                    </span>
                  }
                  description={
                    <span className="form-description">
                      This email to receive all order and delivery updates
                    </span>
                  }
                  onChange={(e) =>
                    contactStore.editEmail(1, e.target.value!)
                  }
                  error={contactStore.contactList[1].error ? "Invalid email" : null}
                />
              </div>
              <Checkbox
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
            </>
          </section>
          {/* PICKUP DATE */}
          <section className="cargo-quote-section grid gap-2">
            <Title order={3}>Pick-up Date</Title>
            <DateInput
              required
              placeholder="select a date"
              leftSection={<Icon icon="uiw:date" />}
              rightSection={<Icon icon="mingcute:down-line" />}
              minDate={new Date(Date.now() + (3600 * 1000 * 24 * 2))}
              label={<span className="form-label">Choose a date</span>}
              {...pickUpDateForm.getInputProps("date")}
            />
          </section>
        </article>
      </form>
      <OrderSummerySection submitHandler={submitHandler} />
    </>
  );
};

export default AddressSection;