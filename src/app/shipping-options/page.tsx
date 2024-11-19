"use client";

import ShippingHeader from "./components/Header";
import ShippingCards from "./components/Cards";
import { IconCurrencyDollar, IconPackage, IconSearch } from "@tabler/icons-react";
export default function ShippingOptionsPage() {
    const shippingData = [
        {
            title: "Standard Shipping",
            description:
                "Our most affordable option, ideal for everyday, non-urgent shipments that prioritize cost-effectiveness over speed.",
            imageUrl: "/assets/images/footer/standard-shipping.png",
            features: [
                {
                    icon: <IconCurrencyDollar size={24} />,
                    title: "Affordable Rates",
                    description:
                        "Perfect for budget-conscious customers, this option ensures cost-effective delivery for less time-sensitive shipments.",
                },
                {
                    icon: <IconPackage size={24} />,
                    title: "Reliable Delivery",
                    description:
                        "Though delivery times may be longer compared to premium services, our trusted carrier partners guarantee safe and secure delivery.",
                },
                {
                    icon: <IconSearch size={24} />,
                    title: "Tracking Capabilities",
                    description:
                        "You can monitor your package’s journey at every stage, ensuring peace of mind.",
                },
            ],
        },
        {
            title: "Standard-Flexi Shipping",
            description:
                "A flexible delivery service allowing you to customize time slots, dates, and preferences for added convenience.",
            imageUrl: "/assets/images/footer/standard-shipping.png",
            features: [
                {
                    icon: <IconCurrencyDollar size={24} />,
                    title: "Flexible Delivery",
                    description:
                        "This service provides control over delivery time slots and allows scheduling specific delivery dates",
                },
                {
                    icon: <IconPackage size={24} />,
                    title: "Convenient Options",
                    description: "Flexi enables you to choose preferences such as leaving the package in a safe place or rerouting it to an alternative address if needed.",
                },
                {
                    icon: <IconSearch size={24} />,
                    title: "Priority Tracking",
                    description:
                        "Gives you access to priority tracking updates and real-time notifications about your package.",
                },
            ],
            reverse: true, // Reverse layout
        },
        {
            title: "Express Shipping",
            description:
                "For time-sensitive shipments, Express Shipping offers a faster delivery service while ensuring the safety of your package.",
            imageUrl: "/assets/images/footer/standard-shipping.png",
            features: [
                {
                    icon: <IconCurrencyDollar size={24} />,
                    title: "Premium Rates",
                    description:
                        "Offers faster delivery for customers who prioritize time over cost-effectiveness.",
                },
                {
                    icon: <IconPackage size={24} />,
                    title: "Quick Delivery",
                    description: "Ensures your package reaches its destination in the shortest possible time.",
                },
                {
                    icon: <IconSearch size={24} />,
                    title: "Priority Tracking",
                    description:
                        "Gives you access to priority tracking updates and real-time notifications about your package.",
                },
            ],
            reverse: false, // Reverse layout
        
        },
        {
            title: "Express Shipping",
            description:
                "For time-sensitive shipments, Express Shipping offers a faster delivery service while ensuring the safety of your package.",
            imageUrl: "/assets/images/footer/standard-shipping.png",
            features: [
                {
                    icon: <IconCurrencyDollar size={24} />,
                    title: "Premium Rates",
                    description:
                        "Offers faster delivery for customers who prioritize time over cost-effectiveness.",
                },
                {
                    icon: <IconPackage size={24} />,
                    title: "Quick Delivery",
                    description: "Ensures your package reaches its destination in the shortest possible time.",
                },
                {
                    icon: <IconSearch size={24} />,
                    title: "Priority Tracking",
                    description:
                        "Gives you access to priority tracking updates and real-time notifications about your package.",
                },
            ],
            reverse: true, // Reverse layout
        
        },
    ];

    return (
        <>
            <div className="bg-[#171F7B]">
                <ShippingHeader />
            </div>
            <div className="mt-6 safe-area">
                {shippingData.map((data, index) => (
                    <ShippingCards
                        key={index}
                        title={data.title}
                        description={data.description}
                        features={data.features}
                        imageUrl={data.imageUrl}
                        reverse={data.reverse}
                    />
                ))}
            </div>
        </>
    )
}