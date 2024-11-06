import { PortableText } from "next-sanity";
import React from "react";
import sanityClient, { sanityImage } from "@/sanity/client";
import { capitalizeFirst } from "@/utils/strings";
import { Text, Title } from "@mantine/core";
import { getFormattedDate } from "@/utils/date";
import Image from "next/image";

interface BlogDetail {
    _type: string;
    _updatedAt: string;
    title: string;
    slug: Slug;
    body: Body[];
    _rev: string;
    publishedAt: string;
    _id: string;
    categories: Category[];
    mainImage: MainImage;
    _createdAt: string;
}

interface MainImage {
    asset: Asset;
    _type: string;
    alt: string;
}

interface Asset {
    _ref: string;
    _type: string;
}

interface Category {
    title: string;
    _id: string;
}

interface Body {
    _type: string;
    style: string;
    _key: string;
    markDefs: any[];
    children: Child[];
    listItem?: string;
    level?: number;
}

interface Child {
    _type: string;
    marks: string[];
    text: string;
    _key: string;
}

interface Slug {
    current: string;
    _type: string;
}

async function getBlog(slug: string) {
    const blogQuery = `*[_type == "post" && slug.current == "${slug}"][0]{
    title,
    slug,
    _type,
    body,
    _updatedAt,
    _rev,
    _id,
    publishedAt,
    mainImage,
    categories[]->{title, _id},
    _createdAt,
}`;
    const result = await sanityClient.fetch<BlogDetail>(blogQuery);
    return result;
}

const BlogDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    try {
        const slug = (await params).slug;
        const BLOG = await getBlog(slug);
        const mainImage = sanityImage(BLOG.mainImage).width(900).url();

        return (
            <main className="max-w-[800px] mx-auto pb-8">
                <section className="grid gap-4">
                    {BLOG.categories.length && (
                        <div className="my-2 flex flex-wrap gap-4 justify-start">
                            {BLOG.categories.map((category) => (
                                <div
                                    key={category._id}
                                    className="rounded text-xs bg-blue-50 text-blue-600 px-3 py-1"
                                >
                                    {capitalizeFirst(category.title)}
                                </div>
                            ))}
                        </div>
                    )}
                    <div>
                        <Title order={2}>{BLOG.title}</Title>
                        <Text className="text-sm text-gray-400">
                            {getFormattedDate(BLOG.publishedAt)}
                        </Text>
                    </div>
                    <Image
                        className="w-full mx-auto h-[400px] rounded-lg object-cover"
                        src={mainImage}
                        alt={BLOG.mainImage.alt}
                    />
                </section>
                <PortableText value={BLOG.body} />
            </main>
        );
    } catch (err) {
        return <>{JSON.stringify(err)}</>;
    }
};

export default BlogDetailsPage;
