'use client';

import ShippingHeader from './components/Header';
import ShippingCards from './components/Cards';
import BaseOptions from './components/Base';
import { IconCurrencyDollar, IconPackage, IconSearch } from '@tabler/icons-react';
export default function ShippingOptionsPage() {
  const shippingData = [
    {
      title: 'Standard Shipping',
      description:
        'Our most affordable option, ideal for everyday, non-urgent shipments that prioritize cost-effectiveness over speed.',
      imageUrl: '/assets/images/footer/standard-shipping.png',
      features: [
        {
          icon: <IconCurrencyDollar size={24} />,
          title: 'Affordable Rates',
          description:
            'Perfect for budget-conscious customers, this option ensures cost-effective delivery for less time-sensitive shipments.',
        },
        {
          icon: <IconPackage size={24} />,
          title: 'Reliable Delivery',
          description:
            'Though delivery times may be longer compared to premium services, our trusted carrier partners guarantee safe and secure delivery.',
        },
        {
          icon: <IconSearch size={24} />,
          title: 'Tracking Capabilities',
          description: 'You can monitor your package’s journey at every stage, ensuring peace of mind.',
        },
      ],
    },
    {
      title: 'Standard-Flexi Shipping',
      description:
        'A flexible delivery service allowing you to customize time slots, dates, and preferences for added convenience.',
      imageUrl: '/assets/images/footer/standard-flexi-shipping.png',
      features: [
        {
          icon: <IconCurrencyDollar size={24} />,
          title: 'Flexible Delivery',
          description:
            'This service provides control over delivery time slots and allows scheduling specific delivery dates',
        },
        {
          icon: <IconPackage size={24} />,
          title: 'Convenient Options',
          description:
            'Flexi enables you to choose preferences such as leaving the package in a safe place or rerouting it to an alternative address if needed.',
        },
        {
          icon: <IconSearch size={24} />,
          title: 'Reliable Service',
          description: 'Flexi offers the same reliability and safety as Standard Shipping, with added flexibility',
        },
      ],
      reverse: true, // Reverse layout
    },
    {
      title: 'Priority Shipping',
      description: 'An expedited service for faster delivery with premium handling and comprehensive tracking options.',
      imageUrl: '/assets/images/footer/priority-shipping.png',
      features: [
        {
          icon: <IconPackage size={24} />,
          title: 'Faster Delivery',
          description:
            'Get your packages delivered significantly faster with our expedited service, perfect for time-sensitive shipments.',
        },
        {
          icon: <IconSearch size={24} />,
          title: 'Tracked Shipments',
          description:
            'Enjoy real-time tracking with regular updates on your package’s location for complete visibility.',
        },
        {
          icon: <IconCurrencyDollar size={24} />,
          title: 'Premium Handling',
          description:
            'Your items receive extra care and priority throughout the shipping process, ensuring safe and secure delivery.',
        },
      ],
      reverse: false,
    },
    {
      title: 'Priority Express Shipping',
      description:
        'The quickest solution for urgent deliveries, offering advanced tracking and round-the-clock customer support',
      imageUrl: '/assets/images/footer/priority-express-shipping.png',
      features: [
        {
          icon: <IconCurrencyDollar size={24} />,
          title: 'Fastest Delivery',
          description: 'Ideal for urgent, time-sensitive shipments, this is the quickest delivery option available',
        },
        {
          icon: <IconPackage size={24} />,
          title: 'Comprehensive Tracking',
          description: 'Advanced tracking ensures you can monitor the shipment at every stage',
        },
        {
          icon: <IconSearch size={24} />,
          title: 'Premium Support',
          description:
            'Our 24/7 customer support team is available to address any concerns or queries regarding your shipment.',
        },
      ],
      reverse: true,
    },
  ];

  return (
    <>
      <div className="bg-[#171F7B]">
        <ShippingHeader />
      </div>
      <div className="md:my-16 my-8 safe-area">
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
      <div className="bg-gray-100 relative z-10 md:py-16 py-8">
        <BaseOptions />
      </div>
    </>
  );
}
