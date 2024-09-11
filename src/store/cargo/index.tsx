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
  addPallet?: () => void;
  editPallet?: (index: number, params: PalletT) => void;
  removePallet?: (index: number) => void;
  //   Package
  addPackage?: () => void;
  editPackage?: (index: number, params: PackageT) => void;
  removePackage?: (index: number) => void;
};

const initialPackageT: PackageT = {
  numberOfPackages: 1,
  weight: 1,
  length: 1,
  width: 1,
  height: 1,
  unit: UNIT_TYPE_ENUM.Metric,
};

const initialPalletT: PalletT = {
  numberOfPallets: 1,
  weight: 1,
  length: 1,
  width: 1,
  height: 1,
  unit: UNIT_TYPE_ENUM.Metric,
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
  packages: [{ ...initialPackageT }],
  pallets: [{ ...initialPalletT }],
};

export const useCargoStore = create<cargoStore>((set) => ({
  cargo: demoSate || {
    collectFrom: undefined,
    deliveryTo: undefined,
    packages: [],
    pallets: [],
  },
  // Packages
  addPackage: () =>
    set(({ cargo }) => {
      return {
        cargo: {
          ...cargo,
          packages: [...cargo.packages, { ...initialPackageT }],
        },
      };
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
  addPallet: () =>
    set(({ cargo }) => {
      return {
        cargo: { ...cargo, pallets: [...cargo.pallets, { ...initialPalletT }] },
      };
    }),
  editPallet: (editIndex, PalletData) =>
    set(({ cargo }) => {
      return {
        cargo: {
          ...cargo,
          pallets: cargo.pallets.map((data, index) => {
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
          pallets: cargo.pallets.filter((_, index) => index != removeIndex),
        },
      };
    }),
}));
