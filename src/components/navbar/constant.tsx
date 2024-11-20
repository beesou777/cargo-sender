import {
  IconUmbrella,
  IconTruckDelivery,
  IconBrandUnsplash,
  IconFingerprint,
  IconBox,
  IconFiles
} from '@tabler/icons-react';

export type BaseNavItem = {
  name: string;
};
export type NavItemWithUrl = BaseNavItem & {
  url: string;
  subNavList?: never;
  icons?:any;
};

export type NavItemWithChildren = BaseNavItem & {
  url?: never;
  subNavList: NavItemT[];
  icons?: any;
};

export type NavItemT = NavItemWithUrl | NavItemWithChildren;

export const NAV_ITEMS: NavItemT[] = [
  {
    name: "Services",
    subNavList: [
      {
        name: "Parcels & Box",
        url: "/",
        icons: IconBox,
      },
      {
        name: "Envelopes & Documents",
        url: "/",
        icons: IconFiles,
      },
      {
        name: "Pallets",
        url: "/",
        icons: IconBrandUnsplash,
      },
    ],
  },
  {
    name: "Features",
    subNavList: [
      {
        name: "Safety & insurance",
        url: "/",
        icons: IconUmbrella,
      },
      {
        name: "Booking Options",
        url: "/shipping-options",
        icons: IconTruckDelivery,
      },
    ],
  },
  {
    name: "Support",
    url: "/support",
  },
  {
    name: "Blogs",
    url: "/blogs",
  },
  {
    name: "Track Order",
    url: "/track-order",
  },
];

