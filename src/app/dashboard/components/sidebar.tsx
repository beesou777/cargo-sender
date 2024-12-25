"use client";
import {
  IconDashboard,
  IconPackage,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linksMockdata = [
  {
    label: "Dashboard",
    icons: IconDashboard,
    link: "/dashboard",
  },
  {
    label: "Create Order",
    icons: IconPlus,
    link: "/dashboard/orders/new",
  },
  {
    label: "Orders",
    icons: IconPackage,
    link: "/dashboard/orders",
  },
  {
    label: "Profile",
    icons: IconUser,
    link: "/dashboard/profile",
  },
];

export default function DoubleNavbar() {
  const pathname = usePathname();
  const links = linksMockdata.map((link) => (
    <Link
      className={`px-4 text-gray-50 hover:text-gray-100`}
      href={`${link.link}`}
      key={link.label}
    >
      <span
        className={`flex items-center gap-2 rounded border-l-[1px_solid_rgba(255,_255,_255,_0.10)] p-4 ${pathname === `${link.link}` ? "bg-[rgba(255,_255,_255,_0.08)] text-gray-50" : ""}`}
      >
        <span
          className={`flex h-[24px] w-[24px] items-center justify-center rounded-[5.333px] bg-[rgba(255,_255,_255,_0.05)] ${pathname === `${link.link}` ? "!bg-gray-50 text-blue-500" : ""}`}
        >
          <link.icons size={16} className="" />
        </span>
        {link.label}
      </span>
    </Link>
  ));

  return (
    <nav className="h-full min-h-[100dvh] bg-[#080C34]">
      <div className="flex flex-col pt-4">{links}</div>
    </nav>
  );
}
