import React from 'react';
import SanityClient from '@/sanity/client';
import BlogCard from '@/components/cards/blogCard';
import { useRouter } from 'next/router';
import { SanityAsset } from '@sanity/image-url/lib/types/types';

const blogsExcludingCurrentQuery = `*[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc) [0...4] {
    _id, 
    mainImage,
    title, 
    publishedAt,
    slug,
    categories[]->{title, _id, slug}
}`;

interface MainImage {
    _type: string;
    alt: string;
    asset: SanityAsset;
}

interface Categories {
    _id: string;
    title: string;
    slug: {
        current: string;
        _type: string;
    };
}

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

async function getBlogsExcludingCurrent(currentSlug: string) {
    return await SanityClient.fetch<BlogMeta[]>(blogsExcludingCurrentQuery, { currentSlug });
}

const ContinueReading = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    const otherBlogs = await getBlogsExcludingCurrent(slug);

    return (
        <>
            <article className='safe-area'>
                <section className="continue-reading">
                    <h2>Continue Reading</h2>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {otherBlogs.map((blog: BlogMeta) => (
                            <BlogCard key={blog._id} {...blog} />
                        ))}
                    </div>
                </section>
            </article>
        </>
    );
};

export default ContinueReading;
