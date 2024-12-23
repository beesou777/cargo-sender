"use client";

import FeatureSection from "./components/Cards";
import ShippingHeader from "./components/Header";

import {
  IconCurrencyDollar,
  IconPackage,
  IconSearch,
} from "@tabler/icons-react";
import InsuranceCoverage from "./components/InsuranceCoverage";
import CaringForCargo from "./components/CargoCaring";
import CommitmentSafety from "./components/CommitmentSafety";
export default function ShippingOptionsPage() {
  const features = [
    {
      title: "State-of-the-Art Facilities",
      description:
        "Our facilities are equipped with advanced systems for parcel security.",
      points: [
        "24/7 surveillance in warehouses",
        "Access controls to safeguard shipments",
        "Cutting-edge security technology",
      ],
      imageUrl: "/assets/images/footer/state-of-art-facility.png",
      reverse: false,
    },
    {
      title: "Secure Handling Protocols",
      description:
        "Our team ensures the safe handling of your parcels with utmost care.",
      points: [
        "Rigorous training for safe handling",
        "Attention to every detail",
        "Safety prioritized at all stages",
      ],
      imageUrl: "/assets/images/footer/secure-handling-protocols.png",
      reverse: true,
    },
    {
      title: "Trusted Partnerships",
      description:
        "We work with reputable partners to guarantee seamless deliveries",
      points: [
        "Collaboration with reliable carriers",
        "Trusted logistics for secure transport",
        "Smooth and dependable delivery experience",
      ],
      imageUrl: "/assets/images/footer/trusted-partnership.png",
    },
    {
      title: "Dedicated Safety Inspections",
      description:
        "We conduct regular inspections to ensure the secure transportation of parcels",
      points: [
        "Routine maintenance of vehicles",
        "Reliable and secure equipment checks",
        "Strict safety standards maintained",
      ],
      imageUrl: "/assets/images/footer/dedicated-safety-inspections.png",
      reverse: true,
    },
  ];

  return (
    <>
      <div className="bg-[#171F7B]">
        <ShippingHeader />
      </div>

      <CommitmentSafety />
      <div className="safe-area md:my-16 my-8">
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            title={feature.title}
            description={feature.description}
            points={feature.points}
            imageUrl={feature.imageUrl}
            reverse={feature.reverse}
          />
        ))}
      </div>
      <InsuranceCoverage />

      <CaringForCargo />
    </>
  );
}
