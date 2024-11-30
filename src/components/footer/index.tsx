"use client";
import { Text } from "@mantine/core";
import Link from "next/link";

import "./style.scss";
import { usePathname } from "next/navigation";

interface FOOTERS_LINK {
  name: string;
  links: Link[];
}

interface Link {
  label: string;
  link: string;
}
const FOOTERS_LINKS: FOOTERS_LINK[] = [
  {
    name: "Services",
    links: [
      { label: "Parcels & Box", link: "/parcel-with-care" },
      { label: "Envelope & Documents", link: "/envelope-and-documents" },
      { label: "Pallets", link: "/pallet" }
    ],
  },
  {
    name: "Features",
    links: [
      { label: "Safety & Insurance", link: "/safety-and-insurance" },
      { label: "Booking Options", link: "/shipping-options" }
    ],
  },
  {
    name: "Company",
    links: [
      { label: "About Us", link: "/about-us" },
      { label: "Career", link: "/career" }
    ],
  },
  {
    name: "Support",
    links: [
      { label: "Help Center", link: "/support" },
      { label: "Contact Us", link: "/contact-us" },
      { label: "Trackng", link: "/tracking" },
      { label: "Resource Center", link: "/resource-center" },
    ],
  },
  {
    name: "Website",
    links: [
      { label: "Cookie Policy", link: "/cookie-policy" },
      { label: "Terms & Privacy Policy", link: "/terms-and-policy" },
    ],
  },
];

const Footer = () => {
  const pathname = usePathname()
  return (
    <footer className={`bg-indigo-950 py-10 relative md:p-[60px] p-[40px] z-10 ${pathname.startsWith('/dashboard') ? 'hidden' : ''}`}>
      <div className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
        {FOOTERS_LINKS?.map((block) => {
          return (
            <div key={block.name}>
              <Text className="!text-white !font-bold !mb-4">{block.name}</Text>
              <div className="flex gap-2 flex-col items-start">
                {block?.links?.map((link) => {
                  return (
                    <Link
                      className="footer-link hover:underline"
                      key={link.label + link.link}
                      href={link.link}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
