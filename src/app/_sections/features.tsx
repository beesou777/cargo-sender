import FeatureCard from "@/components/cards/featureCard";
import { IconEyeDollar, IconShield, IconTruck } from "@tabler/icons-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <IconTruck className="text-xl text-white" />,
      title: "Collection from your door or drop off",
      description: "Save on Worldwide shipping with Cargosender",
      bgColor: "green",
    },
    {
      icon: <IconShield className="text-xl text-white" />,
      title: "Secure & Insured Parcel Delivery",
      description: "Save on Worldwide shipping with Cargosender",
      bgColor: "blue",
    },
    {
      icon: <IconEyeDollar className="text-xl text-white" />,
      title: "Deliveries starting from just $12",
      description: "Save on Worldwide shipping with Cargosender",
      bgColor: "orange.4",
    },
  ];

  return (
    <article className="bg-gray-50 py-[80px] md:py-[100px]">
      <section className="safe-area grid justify-items-center gap-8">
        <div className="grid gap-8 md:grid-cols-3">
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
