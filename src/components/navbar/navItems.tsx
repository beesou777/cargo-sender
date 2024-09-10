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
    name: "Features",
    subNavList: [{ name: "Test", url: "/test" }],
  },
  {
    name: "Resources",
    subNavList: [{ name: "Test", url: "/test" }],
  },
  {
    name: "Track Order",
    url: "/track-order",
  },
];
