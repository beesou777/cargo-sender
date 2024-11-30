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
          className="object-cover rounded-lg overflow-hidden"
          src={image!}
          alt={text!}
          fill
        />
        <div className="w-8 h-8 bg-secondary rounded-full absolute bottom-3 left-3 flex items-center justify-center">
          <span className="text-black">{index}</span>
        </div>
      </div>
      <Text className="text-sm text-pretty" size="xl"><span className="font-semibold mr-1">{title}:</span>{text}</Text>
    </div>
  );
};

export default ProcessCard;
