import { components } from "@/types/eurosender-api-types";
import { StateCreator } from "zustand";

export type GeneralSlice = Omit<
  components["schemas"]["OrderRequest"],
  "shipment" | "parcels"
>;
const defaultValues: GeneralSlice = {
  courierId: null,
  courierTag: null,
  insuranceId: null,
  labelFormat: "pdf",
  paymentMethod: "credit",
  currencyCode: "EUR",
  serviceType: "selection",
  orderContact: {
    email: "",
    name: "",
    phone: "",
    contactMethod: "email",
    contactCustomerType: "customer",
  },
};

export const createGeneralSlice: StateCreator<GeneralSlice> = (set) => ({
  ...defaultValues,

  setGeneralOrderDetails: (details: Omit<GeneralSlice, "orderContact">) =>
    set({ ...details }),

  setOrderContact: (contact: GeneralSlice["orderContact"]) =>
    set({ orderContact: contact }),
});
