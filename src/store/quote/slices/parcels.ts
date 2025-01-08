import { components } from "@/types/eurosender-api-types";
import { StateCreator } from "zustand";

// Defining a custom type for evelopes and pallets because these are not defined in the eurosender-api-types generated from OpenAPI Spec
type Envelopes = Array<{
  parcelId: unknown;
  weight: unknown;
}>;

type Pallets = components["schemas"]["ParcelsRequest"]["packages"];

export type ParcelsSlice = {
  parcels: components["schemas"]["ParcelsRequest"] & {
    envelopes: Envelopes;
    pallets: NonNullable<Pallets>;
    packages: NonNullable<components["schemas"]["ParcelsRequest"]["packages"]>;
  };
};

const defaultValues: ParcelsSlice["parcels"] = {
  envelopes: [],
  packages: [],
  pallets: [],
};

export const createParcelSlice: StateCreator<ParcelsSlice> = (set) => ({
  parcels: defaultValues,
  addEnvelope: (envelope: ParcelsSlice["parcels"]["envelopes"][0]) =>
    set((state) => ({
      ...state,
      envelopes: state.parcels.envelopes
        ? [...state.parcels.envelopes, envelope]
        : [envelope],
    })),
  addPallet: (pallet: ParcelsSlice["parcels"]["pallets"][0]) =>
    set((state) => ({
      ...state,
      pallets: state.parcels.pallets
        ? [...state.parcels.pallets, pallet]
        : [pallet],
    })),
  addPackage: (pkg: ParcelsSlice["parcels"]["packages"][0]) =>
    set((state) => ({
      ...state,
      packages: state.parcels.packages
        ? [...state.parcels.packages, pkg]
        : [pkg],
    })),

  removeParcelByPackageId: (parcelId: unknown) => {
    set((state) => ({
      parcels: {
        envelopes: state.parcels.envelopes?.filter(
          (envelope) => envelope.parcelId !== parcelId
        ),
        packages: state.parcels.packages?.filter(
          (pkg) => pkg.parcelId !== parcelId
        ),
        pallets: state.parcels.pallets?.filter(
          (pallet) => pallet.parcelId !== parcelId
        ),
      },
    }));
  },
  removeParcelByType: (type: keyof ParcelsSlice) => {
    set((state) => ({
      ...state,
      parcels: {
        ...state.parcels,
        [type]: [],
      },
    }));
  },
});
