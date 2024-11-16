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
    name: "Company",
    links: [
      { label: "About Us", link: "/about-us" },
      { label: "Press Center", link: "/press-center" },
      { label: "Career", link: "/career" },
    ],
  },
  {
    name: "Product",
    links: [
      { label: "API Integration", link: "/api-integration" },
      { label: "Business Dashboard", link: "/business-dashboard" },
      { label: "Career", link: "/career" },
    ],
  },
  {
    name: "Support",
    links: [
      { label: "Help Center", link: "/about-us" },
      { label: "Contact Us", link: "/contact-us" },
      { label: "Tracking", link: "/tracking" },
      { label: "Resource Center", link: "/resource-center" },
    ],
  },
  {
    name: "Website",
    links: [
      { label: "Sitemap", link: "/sitemap" },
      { label: "Status", link: "/status" },
      { label: "Cookie Policy", link: "/cookie-policy" },
      { label: "Terms & Privacy Policy", link: "/terms-and-policy" },
    ],
  },
];

const Footer = () => {
  const pathname = usePathname()
  return (
    <footer className={`bg-indigo-950 py-10 ${pathname.startsWith('/dashboard') ? 'hidden' : ''}`}>
      <div className="safe-area grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {FOOTERS_LINKS?.map((block) => {
          return (
            <div key={block.name}>
              <Text className="!text-white !font-bold !mb-4">{block.name}</Text>
              <div className="flex gap-2 flex-col items-start">
                {block?.links?.map((link) => {
                  return (
                    <Link
                      className="footer-link"
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
