import { z } from "zod";
import { QuoteApiSchema } from "../../api/orders/zod";

type FormValues = z.infer<typeof QuoteApiSchema>;

const defaultAddress = {
  country: "",
  zip: null,
  city: null,
  cityId: 0,
  street: null,
  additionalInfo: null,
  region: null,
  regionCode: null,
  regionId: 0,
  timeZoneName: "",
  customFields: [],
};
export const defaultValues: FormValues = {
  shipment: {
    addOns: [],
    deliveryAddress: defaultAddress,
    deliveryContact: null,
    pickupAddress: defaultAddress,
    pickupContact: null,
    pickupDate: null,
  },
  parcels: {
    pallets: [],
    envelopes: [],
    packages: [],
  },
  serviceType: "selection",
  courierTag: null,
  courierId: null,
  insuranceId: null,
  labelFormat: "pdf",
  paymentMethod: "credit",
  currencyCode: "EUR",
};
