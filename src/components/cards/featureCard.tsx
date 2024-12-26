import { Text, ThemeIcon, Title } from "@mantine/core";

type FeatureCard = {
  title?: string;
  description?: string;
  Icon?: any;
  color?: string;
};
const FeatureCard = ({ title, description, Icon, color }: FeatureCard) => {
  return (
    <div className="relative grid justify-items-start gap-4 rounded-lg border border-gray-600 bg-white p-10 shadow-lg">
      <ThemeIcon
        size={52}
        color={color}
        className="!absolute left-0 top-0 !size-10 !rounded-br-[18px] !rounded-tl-[18px]"
      >
        {Icon}
      </ThemeIcon>
      <Title
        order={2}
        className="text-pretty leading-tight"
        fw={600}
        mt={10}
        pb={4}
      >
        {title}
      </Title>
      <Text className="text-balance text-sm" c={"dimmed"}>
        {description}
      </Text>
    </div>
  );
};

export default FeatureCard;
