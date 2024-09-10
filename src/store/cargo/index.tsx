import { create } from "zustand";

export enum UNIT_TYPE_ENUM {
  Metric = "Metric",
  Imperial = "Imperial",
}

export const UNIT_VALUE = {
  Metric: {
    weight: "kg",
    size: "cm",
  },
  Imperial: {
    weight: "pound",
    size: "inch",
  },
};

export type PackageT = {
  numberOfPackages: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  unit: UNIT_TYPE_ENUM;
};

export type PalletT = {
  numberOfPallets: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  unit: UNIT_TYPE_ENUM;
};

type LocationT = {
  country: string;
  geoDetail: {
    location: string;
    postalCode: number;
  };
};

type CargoT = {
  collectFrom?: LocationT;
  deliveryTo?: LocationT;
  packages: PackageT[];
  pallets: PalletT[];
};

type cargoStore = {
  cargo: CargoT;
  updateCollectFrom?: (params: LocationT) => void;
  updateDeliveryTo?: (params: LocationT) => void;
  //   Pallet
  addPallet?: (params: PalletT) => void;
  editPallet?: (index: number, params: PalletT) => void;
  removePallet?: (index: number) => void;
  //   Package
  addPackage?: (params: PackageT) => void;
  editPackage?: (index: number, params: PackageT) => void;
  removePackage?: (index: number) => void;
};

const demoSate: CargoT = {
  collectFrom: {
    country: "India",
    geoDetail: {
      location: "Lucknow, Somewhere",
      postalCode: 64500,
    },
  },
  deliveryTo: {
    country: "Nepal",
    geoDetail: {
      location: "Baneshwor, Kathmandu",
      postalCode: 36500,
    },
  },
  packages: [
    {
      numberOfPackages: 1,
      height: 10,
      length: 10,
      unit: UNIT_TYPE_ENUM.Metric,
      weight: 10,
      width: 10,
    },
  ],
  pallets: [
    {
      numberOfPallets: 1,
      height: 10,
      length: 10,
      unit: UNIT_TYPE_ENUM.Imperial,
      weight: 10,
      width: 10,
    },
  ],
};

export const useCargoStore = create<cargoStore>((set) => ({
  cargo: demoSate || {
    collectFrom: undefined,
    deliveryTo: undefined,
    packages: [],
    pallets: [],
  },
  // Packages
  addPackage: (newPackage) =>
    set(({ cargo }) => {
      return { cargo: { ...cargo, packages: [...cargo.packages, newPackage] } };
    }),
  editPackage: (editIndex, packageData) =>
    set(({ cargo }) => {
      return {
        cargo: {
          ...cargo,
          packages: cargo.packages.map((data, index) => {
            if (index === editIndex) {
              return packageData;
            } else return data;
          }),
        },
      };
    }),
  removePackage: (removeIndex) =>
    set(({ cargo }) => {
      return {
        cargo: {
          ...cargo,
          packages: cargo.packages.filter((_, index) => index != removeIndex),
        },
      };
    }),
  // Pallets
  addPallet: (newPallet) =>
    set(({ cargo }) => {
      return { cargo: { ...cargo, Pallets: [...cargo.pallets, newPallet] } };
    }),
  editPallet: (editIndex, PalletData) =>
    set(({ cargo }) => {
      return {
        cargo: {
          ...cargo,
          Pallets: cargo.pallets.map((data, index) => {
            if (index === editIndex) {
              return PalletData;
            } else return data;
          }),
        },
      };
    }),
  removePallet: (removeIndex) =>
    set(({ cargo }) => {
      return {
        cargo: {
          ...cargo,
          Pallets: cargo.pallets.filter((_, index) => index != removeIndex),
        },
      };
    }),
}));
