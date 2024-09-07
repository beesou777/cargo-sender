import { Text } from "@mantine/core";
import Link from "next/link";

import "./style.scss";

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
      { label: "API Integration", link: "/about-us" },
      { label: "Business Dashboard", link: "/press-center" },
      { label: "Career", link: "/career" },
    ],
  },
  {
    name: "Support",
    links: [
      { label: "Help Center", link: "/about-us" },
      { label: "Contact Us", link: "/press-center" },
      { label: "Tracking", link: "/career" },
      { label: "Resource Center", link: "/career" },
    ],
  },
  {
    name: "Website",
    links: [
      { label: "Sitemap", link: "/about-us" },
      { label: "Status", link: "/press-center" },
      { label: "Cookie Policy", link: "/career" },
      { label: "Terms & Privacy Policy", link: "/career" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-indigo-950 py-10">
      <div className="safe-area grid sm:grid-cols-2 lg:grid-cols-4">
        {FOOTERS_LINKS?.map((block) => {
          return (
            <div key={block.name}>
              <Text className="text-white font-bold mb-4">{block.name}</Text>
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
