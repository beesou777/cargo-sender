import { Text } from "@mantine/core";
import Image from "next/image";

type ProcessCard = {
  image?: string;
  index?: number;
  text?: string;
};
const ProcessCard = ({ image, index, text }: ProcessCard) => {
  return (
    <div className="grid gap-4 ">
      <div className="relative h-[170px] w-full">
        <Image
          className="object-cover rounded-lg overflow-hidden"
          src={image!}
          alt={text!}
          fill
        />
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-9 h-8 bg-orange-100 rounded-full relative flex items-center justify-center">
          <span className="text-orange-600">{index}</span>
        </div>
        <div className="w-full h-1 bg-orange-100"></div>
      </div>
      <Text>{text}</Text>
    </div>
  );
};

export default ProcessCard;
