import { BlogMeta } from "@/app/blogs/page";
import { sanityImage } from "@/sanity/client";
import { getFormattedDate } from "@/utils/date";
import { capitalizeFirst } from "@/utils/strings";
import { Text, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

const BlogCard = (blog: BlogMeta) => {
    const image = sanityImage(blog.mainImage).width(500).url();
    const blogLink = `/blogs/${blog.slug.current}`
    return (
        <Link
            className="p-4 grid gap-2 content-start shadow rounded-lg bg-white no-underline text-black-800 border-default hover:border-blue-600"
            href={blogLink}
            passHref
        >
            <img
                className="w-full h-[300px] rounded-lg object-cover"
                src={image}
                alt={blog.mainImage.alt}
            />
            {blog.categories.length && (
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
            )}
            <Title order={3}>{blog.title}</Title>
            <Text className="text-sm text-gray-400">
                {getFormattedDate(blog.publishedAt)}
            </Text>
        </Link>
    );
};

export default BlogCard;
