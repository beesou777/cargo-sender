import { z } from "zod";

const AddressSchema = z.object({
  country: z.string().nullable(),
  zip: z.string().nullable(),
  city: z.string().nullable(),
  cityId: z.number().nullable(),
  street: z.string().nullable(),
  additionalInfo: z.string().nullable(),
  region: z.string().nullable(),
  regionCode: z.string().nullable(),
  regionId: z.number().nullable(),
  timeZoneName: z.string().nullable(),
  customFields: z.array(z.unknown()),
});

const ContactSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

const PackageSchema = z.object({
  parcelId: z.string(),
  quantity: z.number(),
  width: z.number(),
  height: z.number(),
  length: z.number(),
  weight: z.number().optional(),
  content: z.string().optional(),
  value: z.number(),
});

const ShipmentSchema = z.object({
  pickupAddress: AddressSchema,
  deliveryAddress: AddressSchema,
  pickupDate: z.string().default(new Date().toISOString()), // Consider using a date or datetime parser if needed
  pickupContact: ContactSchema.nullable(),
  deliveryContact: ContactSchema.nullable(),
  addOns: z.string().array().default(["flexibleChanges"]),
});

const ParcelsSchema = z.object({
  envelopes: z.array(z.unknown()),
  packages: z.array(PackageSchema).optional(),
  pallets: z.array(z.unknown()),
});

export const QuoteApiSchema = z.object({
  shipment: ShipmentSchema,
  parcels: ParcelsSchema,
  serviceType: z.enum([
    "selection",
    "flexi",
    "regular_plus",
    "express",
    "freight",
  ]),
  courierTag: z.string().nullable(),
  courierId: z.number().nullable(),
  insuranceId: z.number().nullable(),
  labelFormat: z.enum(["pdf", "zpl"]),
  currencyCode: z.string().default("EUR"),
  paymentMethod: z.enum(["credit", "deferred"]),
});
