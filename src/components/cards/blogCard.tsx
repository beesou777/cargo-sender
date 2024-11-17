import { BlogMeta } from "@/app/blogs/page";
import { sanityImage } from "@/sanity/client";
import { getFormattedDate } from "@/utils/date";
import { capitalizeFirst } from "@/utils/strings";
import { Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const BlogCard = (blog: BlogMeta) => {
    const category = blog.categories[0]?.slug?.current
    const blogLink = `/blogs/${category}/${blog.slug.current}`
    return (
        <Link
            className=" py-4 grid gap-2 content-start no-underline text-gray-900 group"
            href={blogLink}
            passHref
        >
           <div className="aspect-[480/258] overflow-hidden rounded-[4px] bg-[#f5f5f5]">
           <Image
                width={480}
                height={258}
                className="w-full aspect-[480/258] group-hover:scale-[1.1] object-cover duration-300 max-w-full h-auto"
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
            <Title className="body-2 group-hover:underline duration-300 font-bold mt-4 mb-0 text-gray-950 leading-[150%] text-pretty line-clamp-2" order={3}>{capitalizeFirst(blog.title)}</Title>
            <Text className="text-pretty text-muted text-sm">
                {getFormattedDate(blog.publishedAt)}
            </Text>
        </Link>
    );
};

export default BlogCard;
