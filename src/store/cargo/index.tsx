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
    weight: "lb",
    size: "in",
  },
};

export type PackageT = {
  noOfItems: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  unit: UNIT_TYPE_ENUM;
};

export type PalletT = {
  noOfItems: number;
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

export type cargoValidationResolveType = {
  packagesErrorList: string[];
  palletsErrorList: string[];
  errorList: string[];
} | null;

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
  validateData: () => cargoValidationResolveType;
};

const initialPackageT: PackageT = {
  noOfItems: 1,
  weight: 1,
  length: 1,
  width: 1,
  height: 1,
  unit: UNIT_TYPE_ENUM.Metric,
};

const initialPalletT: PalletT = {
  noOfItems: 1,
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

export const useCargoStore = create<cargoStore>((set, get) => ({
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
  validateData: () => {
    const errorList: string[] = [];
    const packagesErrorList: string[] = [];
    const palletsErrorList: string[] = [];

    const pallets = get().cargo.pallets;
    const packages = get().cargo.packages;
    const deliveryTo = get().cargo.deliveryTo;
    const collectFrom = get().cargo.collectFrom;

    packages.forEach((ITEM, INDEX) => {
      Object.getOwnPropertyNames(ITEM).forEach((key) => {
        if (key != "unit") {
          // @ts-ignore
          if (typeof ITEM[key] != "number" || ITEM[key] <= 0)
            packagesErrorList.push(
              `Package ${INDEX + 1}: Invalid "${key}", needs to be more than 0.`
            );
        }
      });
    });
    pallets.forEach((ITEM, INDEX) => {
      Object.getOwnPropertyNames(ITEM).forEach((key) => {
        if (key != "unit") {
          // @ts-ignore
          if (typeof ITEM[key] != "number" || ITEM[key] <= 0)
            palletsErrorList.push(
              `Pallet ${INDEX + 1}: Invalid "${key}", needs to be more than 0.`
            );
        }
      });
    });

    if (!deliveryTo?.country) errorList.push(`Invalid delivery location`);
    if (!collectFrom?.country) errorList.push(`Invalid collect location`);
    if (errorList.length || packagesErrorList.length || palletsErrorList.length)
      return { errorList, packagesErrorList, palletsErrorList };
    else return null;
  },
}));
