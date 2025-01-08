import { create } from "zustand";
import { createShipmentSlice, ShipmentSlice } from "./slices/shipment";
import { createParcelSlice, ParcelsSlice } from "./slices/parcels";
import { createGeneralSlice, GeneralSlice } from "./slices/general";

type QuoteStoreType = ShipmentSlice & ParcelsSlice & GeneralSlice;

export const useQuotationDataStore = create<QuoteStoreType>((...a) => ({
  ...createShipmentSlice(...a),
  ...createParcelSlice(...a),
  ...createGeneralSlice(...a),
}));
