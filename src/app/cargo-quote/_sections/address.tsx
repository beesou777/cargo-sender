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

type AddressT = {
  fullName: string;
  address: string;
  addressExtra?: string;
  postalCode: number;
  city: string;
  phoneNumber: number;
  country: string;
  additionalNotes?: string;
};

type ContactDetailT = {
  email: string;
  newsletterSubscription: boolean;
};

type DateOfPickupT = {
  date: Date;
};

const AddressSection = () => {
  const pickUpAddressForm = useForm<AddressT>({
    initialValues: {
      fullName: "",
      address: "",
      addressExtra: "",
      postalCode: 0,
      city: "",
      phoneNumber: 0,
      country: "",
      additionalNotes: "",
    },
  });
  const deliveryAddressForm = useForm<AddressT>({
    initialValues: {
      fullName: "",
      address: "",
      addressExtra: "",
      postalCode: 0,
      city: "",
      phoneNumber: 0,
      country: "",
      additionalNotes: "",
    },
  });

  const pickUpDateForm = useForm<DateOfPickupT>();

  function pickUpAddressHandler(data: AddressT) {
    console.log(data);
  }
  function deliveryAddressHandler(data: AddressT) {
    console.log(data);
  }
  function pickUpDateHandler(data: DateOfPickupT) {
    console.log(data);
  }
  return (
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
        <section
          className="grid gap-2"
          onMouseLeave={() => pickUpAddressForm.onSubmit(pickUpAddressHandler)}
          onBlur={() => pickUpAddressForm.onSubmit(pickUpAddressHandler)}
        >
          <Title order={4}>Pick-up Address</Title>
          <TextInput
            label={<span className="form-label">Full Name</span>}
            placeholder="Person or Company"
            {...pickUpAddressForm.getInputProps("fullName")}
          />
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <TextInput
              label={<span className="form-label">Address</span>}
              placeholder="Street Address"
              {...pickUpAddressForm.getInputProps("address")}
            />
            <TextInput
              placeholder="Apt, Floor, Suite, etc. (optional)"
              {...pickUpAddressForm.getInputProps("addressExtra")}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <TextInput
              label={<span className="form-label">Postal Code</span>}
              placeholder="112366"
              {...pickUpAddressForm.getInputProps("postalCode")}
            />
            <TextInput
              label={<span className="form-label">City</span>}
              placeholder="Warsaw"
              {...pickUpAddressForm.getInputProps("city")}
            />
          </div>
          <div className="flex gap-4 items-end">
            <Select
              label={<span className="form-label">Country</span>}
              {...pickUpAddressForm.getInputProps("country")}
            />
            <NumberInput
              label={<span className="form-label">Phone Number</span>}
              className="w-full"
              hideControls
              placeholder="22 333 4444"
              {...pickUpAddressForm.getInputProps("phoneNumber")}
            />
          </div>
          <Textarea
            rows={5}
            label={
              <span className="form-label">Additional Notes (optional)</span>
            }
            placeholder="You can add in some additional notes here. This will not be sent to the carrier automatically"
            {...pickUpAddressForm.getInputProps("additionalNotes")}
          />
        </section>
        {/* DELIVERY ADDRESS */}
        <section
          className="grid gap-2"
          onBlur={() => deliveryAddressForm.onSubmit(pickUpAddressHandler)}
          onMouseLeave={() =>
            deliveryAddressForm.onSubmit(pickUpAddressHandler)
          }
        >
          <Title order={4}>Delivery Address</Title>
          <TextInput
            label={<span className="form-label">Full Name</span>}
            placeholder="Person or Company"
            {...deliveryAddressForm.getInputProps("fullName")}
          />
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <TextInput
              label={<span className="form-label">Address</span>}
              placeholder="Street Address"
              {...deliveryAddressForm.getInputProps("address")}
            />
            <TextInput
              placeholder="Apt, Floor, Suite, etc. (optional)"
              {...deliveryAddressForm.getInputProps("addressExtra")}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <TextInput
              label={<span className="form-label">Postal Code</span>}
              placeholder="112366"
              {...deliveryAddressForm.getInputProps("postalCode")}
            />
            <TextInput
              label={<span className="form-label">City</span>}
              placeholder="Warsaw"
              {...deliveryAddressForm.getInputProps("city")}
            />
          </div>
          <div className="flex gap-4 items-end">
            <Select
              label={<span className="form-label">Country</span>}
              {...deliveryAddressForm.getInputProps("country")}
            />
            <NumberInput
              label={<span className="form-label">Phone Number</span>}
              className="w-full"
              hideControls
              placeholder="22 333 4444"
              {...deliveryAddressForm.getInputProps("phoneNumber")}
            />
          </div>
          <Textarea
            rows={5}
            label={
              <span className="form-label">Additional Notes (optional)</span>
            }
            placeholder="You can add in some additional notes here. This will not be sent to the carrier automatically"
            {...deliveryAddressForm.getInputProps("additionalNotes")}
          />
        </section>
      </article>
      {/* CONTACT DETAILS */}
      <section className="cargo-quote-section grid gap-2">
        <Title order={3}>Contact Details</Title>
        <Text>
          Choose the email that will receive all order and delivery updates
        </Text>
        <TextInput
          type="email"
          placeholder="eg:john@domain.com"
          label={<span className="form-label">Email Address</span>}
          description={
            <span className="form-description">
              This email to receive all order and delivery updates
            </span>
          }
        />
        <Checkbox
          label={
            <span className="form-label">Opt-in for newsletter emails</span>
          }
        />
        <TextInput
          type="email"
          placeholder="eg:john@domain.com"
          label={<span className="form-label">Email Address 2</span>}
          description={
            <span className="form-description">
              This email to receive all order and delivery updates
            </span>
          }
        />
        <Checkbox
          label={
            <span className="form-label">Opt-in for newsletter emails</span>
          }
        />
        <div className="mt-4">
          <Button
            color="blue.5"
            variant="light"
            leftSection={<Icon icon="ic:baseline-plus" />}
          >
            Add another e-mail
          </Button>
        </div>
      </section>
      {/* PICKUP DATE */}
      <section className="cargo-quote-section grid gap-2">
        <Title order={3}>Pick-up Date</Title>
        <DateInput
          required
          placeholder="select a date"
          leftSection={<Icon icon="uiw:date" />}
          rightSection={<Icon icon="mingcute:down-line" />}
          label={<span className="form-label">Choose a date</span>}
          {...pickUpDateForm.getInputProps("date")}
        />
      </section>
    </article>
  );
};

export default AddressSection;
