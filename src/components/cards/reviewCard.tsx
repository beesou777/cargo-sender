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
    <div className="text-secondary-light grid cursor-grab select-none content-start gap-2 text-sm">
      <div className="relative mb-2 h-16 w-16">
        <Image
          className="overflow-hidden rounded-full object-cover"
          src={image!}
          alt={`${name!} profile picture`}
          fill
        />
      </div>
      <Text className="text-balance font-semibold">{review}</Text>
      <div className="with-icon">
        <Icon className="text-lg text-secondary" icon="material-symbols:star" />
        <span>{stars}/5</span>
      </div>
      <Text className="opacity-70">
        {name?.toLocaleUpperCase()} ({title})
      </Text>
    </div>
  );
};

export default ReviewCard;
