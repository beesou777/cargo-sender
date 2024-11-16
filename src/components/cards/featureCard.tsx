import { Icon } from "@iconify/react";
import { Text } from "@mantine/core";

type FeatureCard = {
  title?: string;
  description?: string;
};
const FeatureCard = ({ title, description }: FeatureCard) => {
  return (
    <div className="grid justify-items-start gap-4 p-10 bg-white rounded-lg border border-gray-600 shadow-lg">
      <div className="flex size-10 items-center justify-center bg-secondary-light text-secondary rounded">
        <Icon className="text-3xl" icon="material-symbols:last-page" />
      </div>
      <Text className="text-2xl font-bold leading-tight text-pretty">
        {title}
      </Text>
      <Text className="text-sm text-balance text-gray-600">{description}</Text>
    </div>
  );
};

export default FeatureCard;
