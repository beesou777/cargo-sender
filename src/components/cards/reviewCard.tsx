import { Icon } from "@iconify/react/dist/iconify.js";
import { Text } from "@mantine/core";
import Image from "next/image";

type ReviewCard = {
  image: string;
  title: string;
  name: string;
  review: string;
  stars: number;
};
const ReviewCard = ({ image, name, review, stars, title }: ReviewCard) => {
  return (
    <div className="grid gap-2 content-start text-secondary-light text-sm cursor-grab select-none">
      <div className="relative mb-2 h-16 w-16">
        <Image
          className="object-cover rounded-full overflow-hidden"
          src={image!}
          alt={`${name!} profile picture`}
          fill
        />
      </div>
      <Text className="font-semibold text-balance">{review}</Text>
      <div className="with-icon">
        <Icon className="text-secondary text-lg" icon="material-symbols:star" />
        <span>{stars}/5</span>
      </div>
      <Text className="opacity-70">
        {name?.toLocaleUpperCase()} ({title})
      </Text>
    </div>
  );
};

export default ReviewCard;
