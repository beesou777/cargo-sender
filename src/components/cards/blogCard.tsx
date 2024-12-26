import { BlogMeta } from "@/app/blogs/page";
import { sanityImage } from "@/sanity/client";
import { getFormattedDate } from "@/utils/date";
import { capitalizeFirst } from "@/utils/strings";
import { Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const BlogCard = (blog: BlogMeta) => {
  const category = blog.categories?.[0]?.slug?.current || "no-category";
  const blogLink = `/blogs/${category}/${blog.slug.current}`;
  return (
    <Link
      className="group grid content-start gap-2 py-4 text-gray-900 no-underline"
      href={blogLink}
      passHref
    >
      <div className="aspect-[480/258] overflow-hidden rounded-[4px] bg-[#f5f5f5]">
        <Image
          width={480}
          height={258}
          className="aspect-[480/258] h-auto w-full max-w-full object-cover duration-300 group-hover:scale-[1.1]"
          src={sanityImage(blog.mainImage).url()}
          alt={blog.title}
        />
      </div>
      {/* {blog.categories.length && (
                <div className="my-2 flex flex-wrap gap-4 justify-start">
                    {blog.categories.map((category) => (
                        <div
                            key={category._id}
                            className="rounded text-xs bg-blue-50 text-blue-600 px-3 py-1"
                        >
                            {capitalizeFirst(category.title)}
                        </div>
                    ))}
                </div>
            )} */}
      <Title
        className="body-2 mb-0 mt-4 line-clamp-2 text-pretty font-bold leading-[150%] text-gray-950 duration-300 group-hover:underline"
        order={3}
      >
        {capitalizeFirst(blog.title)}
      </Title>
      <Text className="text-pretty text-sm text-muted">
        {getFormattedDate(blog.publishedAt)}
      </Text>
    </Link>
  );
};

export default BlogCard;
