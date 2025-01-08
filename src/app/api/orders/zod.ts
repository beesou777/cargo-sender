import { components } from "@/types/eurosender-api-types";
import { z } from "zod";

export const AddressSchema = z.object({
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

export const ContactSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const PackageSchema = z.object({
  parcelId: z.string(),
  quantity: z.number(),
  length: z.number().min(15),
  width: z.number().min(11),
  height: z.number().min(11),
  weight: z.number().min(0.1).optional(),
  content: z.string().optional(),
  value: z.number().min(0.1),
});

export const PalletSchema = z.object({
  parcelId: z.string(),
  quantity: z.number(),
  length: z.number().min(15),
  width: z.number().min(11),
  height: z.number().min(11),
  weight: z.number().min(0.1).optional(),
  content: z.string().optional(),
  value: z.number().min(0.1),
});

export const EnvelopeSchema = z.object({
  parcelId: z.string(),
  weight: z.number(),
  quantity: z.number(),
});

export const ShipmentSchema = z.object({
  pickupAddress: AddressSchema,
  deliveryAddress: AddressSchema,
  pickupDate: z.string().default(new Date().toISOString()).nullable(), // Consider using a date or datetime parser if needed
  pickupContact: ContactSchema.nullable(),
  deliveryContact: ContactSchema.nullable(),
  addOns: z.string().array().default(["flexibleChanges"]),
});

export const ParcelsSchema = z.object({
  envelopes: z.array(EnvelopeSchema).optional(),
  packages: z.array(PackageSchema).optional(),
  pallets: z.array(PalletSchema).optional(),
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
