import type { NextApiRequest } from "next";
import { ZodError, z } from "zod";
import axios from "axios";
import { zodToError } from "../../../../utils/zod_error_handler";
import { NextRequest } from "next/server";

const baseUrl = "https://sandbox.eurosender.com";

const addressSchema = z.object({
  country: z.string().length(2), // assuming ISO country codes
  zip: z.string(),
  city: z.string(),
  street: z.string(),
});

const parcelSchema = z.object({
  parcelId: z.string(),
  quantity: z.number().int().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  length: z.number().positive(),
  weight: z.number().positive(),
  value: z.number().positive(),
});

const shipmentSchema = z.object({
  pickupAddress: addressSchema,
  deliveryAddress: addressSchema,
});

const parcelsSchema = z.object({
  packages: z.array(parcelSchema),
});

const quoteOrderSchema = z.object({
  shipment: shipmentSchema,
  parcels: parcelsSchema,
  paymentMethod: z.enum(["credit"]), // assuming possible payment methods
  currencyCode: z.string().length(3), // assuming ISO currency codes
  serviceType: z.enum(["standard", "express", "selection"]), // assuming possible service types
});

export const getOrders = (req: NextApiRequest, res: NextApiResponse) => {};

export const createOrder = (req: NextApiRequest, res: NextApiResponse) => {};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  maxDuration: 10,
};
