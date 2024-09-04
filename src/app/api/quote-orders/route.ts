import { ZodError, z } from "zod";
import axios from "axios";
import { zodToError } from "../../../../utils/zod_error_handler";
import { NextRequest } from "next/server";

const baseUrl = "https://sandbox-api.eurosender.com/v1";

const AddressSchema = z.object({
  country: z.string(),
  zip: z.string(),
  city: z.string(),
  cityId: z.string().nullable(),
  street: z.string(),
  additionalInfo: z.string().nullable(),
  region: z.string().nullable(),
  regionCode: z.string().nullable(),
  regionId: z.string().nullable(),
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
  weight: z.number(),
  content: z.string(),
  value: z.number(),
});

const ShipmentSchema = z.object({
  pickupAddress: AddressSchema,
  deliveryAddress: AddressSchema,
  pickupDate: z.string(), // Consider using a date or datetime parser if needed
  pickupContact: ContactSchema,
  deliveryContact: ContactSchema,
  addOns: z.array(z.string()),
});

const ParcelsSchema = z.object({
  envelopes: z.array(z.unknown()),
  packages: z.array(PackageSchema),
  pallets: z.array(z.unknown()),
});

const QuoteApiSchema = z.object({
  shipment: ShipmentSchema,
  parcels: ParcelsSchema,
  paymentMethod: z.string(),
  currencyCode: z.string(),
  serviceType: z.string(),
  courierTag: z.string().nullable(),
  preferredCouriersOnly: z.boolean(),
  courierId: z.string().nullable(),
  insuranceId: z.string().nullable(),
  labelFormat: z.string().nullable(),
});

export const quoteOrder = async (payload: Object) => {
  try {
    const url = `${baseUrl}/quotes`;
    console.log(url);
    const axiosRes = await axios.post(
      url,
      {
        ...payload,
      },
      {
        headers: {
          "x-api-key": process.env.EURO_SENDER_API_KEY,
        },
      },
    );
    const data = axiosRes.data;
    return data;
  } catch (e) {
    console.log(e);
    console.log(e.response);
    return e.response.data;
  }
};

async function handler(req: Request) {
  try {
    const body = await req.json();
    QuoteApiSchema.parse(body);
    const result = await quoteOrder(body);
    return {
      message: "Quote order",
      data: result,
    };
  } catch (e) {
    if (e instanceof ZodError) {
      return { ...zodToError(e) };
    }
  }
}

export async function POST(req: NextRequest) {
  const res = await handler(req);
  return Response.json(res);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  maxDuration: 10,
};
