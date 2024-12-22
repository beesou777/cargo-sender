import FeatureCard from '@/components/cards/featureCard';
import { IconEyeDollar, IconShield, IconTruck } from '@tabler/icons-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <IconTruck className="text-white text-xl" />,
      title: 'Collection from your door or drop off',
      description: 'Save on Worldwide shipping with Cargosender',
      bgColor: 'green',
    },
    {
      icon: <IconShield className="text-white text-xl" />,
      title: 'Secure & Insured Parcel Delivery',
      description: 'Save on Worldwide shipping with Cargosender',
      bgColor: 'blue',
    },
    {
      icon: <IconEyeDollar className="text-white text-xl" />,
      title: 'Deliveries starting from just $12',
      description: 'Save on Worldwide shipping with Cargosender',
      bgColor: 'orange.4',
    },
  ];

  return (
    <article className="py-[80px] md:py-[100px] bg-gray-50">
      <section className="safe-area grid gap-8 justify-items-center">
        <div className="grid md:grid-cols-3 gap-8 ">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              Icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.bgColor}
            />
          ))}
        </div>
      </section>
    </article>
  );
};

export default FeatureSection;
