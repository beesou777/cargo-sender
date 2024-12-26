import { Text } from "@mantine/core";
import Image from "next/image";

type ProcessCard = {
  image?: string;
  index?: number;
  title?: string;
  text?: string;
};
const ProcessCard = ({ image, index, text, title }: ProcessCard) => {
  return (
    <div className="grid gap-4">
      <div className="relative h-[170px] w-full">
        <Image
          className="overflow-hidden rounded-lg object-cover"
          src={image!}
          alt={text!}
          fill
        />
        <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
          <span className="text-black">{index}</span>
        </div>
      </div>
      <Text className="text-pretty text-sm" size="xl">
        <span className="mr-1 font-semibold">{title}:</span>
        {text}
      </Text>
    </div>
  );
};

export default ProcessCard;
