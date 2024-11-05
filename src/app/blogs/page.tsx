import React from 'react'
import SanityClient, { sanityImage } from '@/sanity/client'
import { Text, Title } from '@mantine/core';
import { getFormattedDate } from '@/utils/date';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { capitalizeFirst } from '@/utils/strings';
import Link from 'next/link';
import BlogCard from '@/components/cards/blogCard';

export interface BlogMeta {
    mainImage: MainImage;
    title: string;
    publishedAt: string;
    slug: {
        current: string,
        _type: string
    },
    _id: string;
    categories: Categories[];
}

interface Categories {
    _id: string;
    title: string;
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
    categories[]->{title, _id}
}
`

async function getBlogs() {
    const result = await SanityClient.fetch<BlogMeta[]>(blogsQuery)
    return result
}

const BlogsPage = async () => {
    try {
        const BLOGS = await getBlogs()
        return (
            <main className="safe-area w-full mx-auto pb-8 flex flex-col gap-4">
                <Title order={3}>Latest Posts</Title>
                <div className='grid gap-4 sm:grid-cols-3'>
                    {BLOGS?.map(blog => <BlogCard key={blog._id} {...blog} />)}
                    {BLOGS?.map(blog => <BlogCard key={blog._id} {...blog} />)}
                    {BLOGS?.map(blog => <BlogCard key={blog._id} {...blog} />)}
                </div>
            </main>
        )
    } catch (err) {
        <main className='safe-area'>
            <Text>Unable to find Blogs.</Text>
        </main>
    }
}

export default BlogsPage