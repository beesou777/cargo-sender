import React from 'react';
import SanityClient, { sanityImage } from '@/sanity/client';
import { Text, Title } from '@mantine/core';
import { getFormattedDate } from '@/utils/date';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { capitalizeFirst } from '@/utils/strings';
import Link from 'next/link';
import BlogCard from '@/components/cards/blogCard';
import BlogHeader from './components/BlogHeader';

export interface BlogMeta {
    mainImage: MainImage;
    title: string;
    publishedAt: string;
    slug: {
        current: string;
        _type: string;
    };
    _id: string;
    categories: Categories[];
}

interface Categories {
    _id: string;
    title: string;
    slug: {
        current: string;
        _type: string;
    };
}

interface MainImage {
    _type: string;
    alt: string;
    asset: SanityAsset;
}

const blogsQuery = `*[_type=="post"] {
    _id, 
    mainImage,
    title, 
    publishedAt,
    slug,
    categories[]->{title, _id,slug}
}`;

async function getBlogs() {
    const result = await SanityClient.fetch<BlogMeta[]>(blogsQuery);
    return result;
}

const BlogsPage = async () => {
    try {
        const BLOGS = await getBlogs();

        // Group blogs by category
        const blogsByCategory = BLOGS.reduce((acc, blog) => {
            blog.categories.forEach((category) => {
                if (!acc[category.title]) {
                    acc[category.title] = [];
                }
                acc[category.title].push(blog);
            });
            return acc;
        }, {} as Record<string, BlogMeta[]>);

        return (
            <>
                <div className="bg-[#1a1a2e]">
                    <BlogHeader categories={blogsByCategory} />
                </div>
                <main className="safe-area w-full mx-auto pb-8 flex flex-col gap-4 px-[24px] mt-[40px]">
                    {Object.entries(blogsByCategory).map(([categoryTitle, blogs]) => (
                        <section key={categoryTitle} className="mb-8">
                           <div className="flex justify-between">
                           <Title order={3} className="mb-4">
                                {capitalizeFirst(categoryTitle)}
                            </Title>
                            <Link
                                href={`/blogs/${categoryTitle.split(' ').join('-').toLocaleLowerCase()}`}
                                className="text-sm text-gray-900 font-semibold hover:underline"
                            >
                                View All
                            </Link>
                           </div>
                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                                {blogs.slice(0, 4).map((blog) => (
                                    <BlogCard key={blog._id} {...blog} />
                                ))}
                            </div>
                        </section>
                    ))}
                </main>
            </>
        );
    } catch (err) {
        return (
            <main className="safe-area">
                <Text>Unable to find Blogs.</Text>
            </main>
        );
    }
};

export default BlogsPage;
