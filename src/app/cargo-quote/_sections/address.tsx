import { Icon } from "@iconify/react/dist/iconify.js";
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
import Link from "next/link";

const AddressSection = () => {
  return (
    <article className="grid gap-8">
      <article className="cargo-quote-section grid gap-4 ">
        <section className="grid gap-2">
          <Title order={3}>Pick-up & Delivery</Title>
          <Alert variant="light" color="blue.3" radius="sm" p={8}>
            <span className="with-icon text-blue-500">
              <Icon className="text-xl" icon="mdi:about-circle-outline" />
              Returning Customers?
              <Link href="/login">Click here</Link>
              to log in and access your saved information
            </span>
          </Alert>
        </section>
        {/* PICK UP ADDRESS */}
        <section className="grid gap-2">
          <Title order={4}>Pick-up Address</Title>
          <TextInput
            label={<span className="form-label">Full Name</span>}
            placeholder="Person or Company"
          />
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <TextInput
              label={<span className="form-label">Address</span>}
              placeholder="Street Address"
            />
            <TextInput placeholder="Apt, Floor, Suite, etc. (optional)" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <TextInput
              label={<span className="form-label">Postal Code</span>}
              placeholder="112366"
            />
            <TextInput
              label={<span className="form-label">City</span>}
              placeholder="Warsaw"
            />
          </div>
          <div className="flex gap-4 items-end">
            <Select label={<span className="form-label">Country</span>} />
            <NumberInput
              label={<span className="form-label">Phone Number</span>}
              className="w-full"
              hideControls
              placeholder="22 333 4444"
            />
          </div>
          <Textarea
            rows={5}
            label={
              <span className="form-label">Additional Notes (optional)</span>
            }
            placeholder="You can add in some additional notes here. This will not be sent to the carrier automatically"
          />
        </section>
        {/* DELIVERY ADDRESS */}
        <section className="grid gap-2">
          <Title order={4}>Delivery Address</Title>
          <TextInput
            label={<span className="form-label">Full Name</span>}
            placeholder="Person or Company"
          />
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <TextInput
              label={<span className="form-label">Address</span>}
              placeholder="Street Address"
            />
            <TextInput placeholder="Apt, Floor, Suite, etc. (optional)" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <TextInput
              label={<span className="form-label">Postal Code</span>}
              placeholder="112366"
            />
            <TextInput
              label={<span className="form-label">City</span>}
              placeholder="Warsaw"
            />
          </div>
          <div className="flex gap-4 items-end">
            <Select label={<span className="form-label">Country</span>} />
            <NumberInput
              label={<span className="form-label">Phone Number</span>}
              className="w-full"
              hideControls
              placeholder="22 333 4444"
            />
          </div>
          <Textarea
            rows={5}
            label={
              <span className="form-label">Additional Notes (optional)</span>
            }
            placeholder="You can add in some additional notes here. This will not be sent to the carrier automatically"
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
        />
      </section>
    </article>
  );
};

export default AddressSection;
