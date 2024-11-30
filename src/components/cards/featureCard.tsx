import { Text, ThemeIcon, Title } from "@mantine/core";

type FeatureCard = {
  title?: string;
  description?: string;
  Icon?: any;
  color?: string;
};
const FeatureCard = ({ title, description, Icon,color }: FeatureCard) => {
  return (
    <div className="grid justify-items-start gap-4 p-10 bg-white rounded-lg border border-gray-600 shadow-lg relative">
      <ThemeIcon size={42} color={color} className="!absolute top-0 left-0 !size-10 !rounded-br-[18px] !rounded-tl-[18px]">
        {Icon}
      </ThemeIcon>
      <Title order={2} className="font-bold leading-tight text-pretty pb-4">
        {title}
      </Title>
      <Text className="text-sm text-balance !text-gray-400">{description}</Text>
    </div>
  );
};

export default FeatureCard;
