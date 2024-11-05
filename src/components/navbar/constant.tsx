export type BaseNavItem = {
  name: string;
};
export type NavItemWithUrl = BaseNavItem & {
  url: string;
  subNavList?: never;
};

export type NavItemWithChildren = BaseNavItem & {
  url?: never;
  subNavList: NavItemT[];
};

export type NavItemT = NavItemWithUrl | NavItemWithChildren;

export const NAV_ITEMS: NavItemT[] = [
  {
    name: "My Account",
    subNavList: [
      {
        name: "Features",
        subNavList: [{ name: "Test", url: "/test" }],
      },
    ],
  },
  {
    name: "Resources",
    subNavList: [
      {
        name: "Quick start",
        url: "/resources/quick-start",
      },
      {
        name: "Order making",
        url: "/resources/order-making",
      },
      {
        name: "Packaging",
        url: "/resources/packaging",
      },
      {
        name: "Pickup and delivery",
        url: "/resources/pickup-delivery",
      },
      {
        name: "Restriction",
        url: "/resources/restriction",
      },
      {
        name: "Payment",
        url: "/resources/payment",
      },
      {
        name: "Others",
        url: "/resources/others",
      },

    ],
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
