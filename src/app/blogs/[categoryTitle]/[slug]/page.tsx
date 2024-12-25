import { PortableText } from 'next-sanity';
import React from 'react';
import sanityClient, { sanityImage } from '@/sanity/client';
import { Divider, Text, Title } from '@mantine/core';
import { getFormattedDate } from '@/utils/date';
import Image from 'next/image';
import '../style.css';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import ContinueReading from '../../components/continueReading';

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

// Query to fetch the blog post by slug
async function getBlogBySlug(slug: string) {
  const blogQuery = `*[_type == "post" && slug.current == $slug][0]{
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
  const result = await sanityClient.fetch<BlogDetail>(blogQuery, { slug });
  return result;
}

// Query to validate the categoryTitle
async function validateCategoryTitle(categoryTitle: string) {
  const categoryQuery = `*[_type == "category" && title == $categoryTitle][0]{
        title,
        _id
    }`;
  const result = await sanityClient.fetch<Category>(categoryQuery, {
    categoryTitle,
  });
  return result;
}

const BlogDetailsPage = async ({ params }: { params: { categoryTitle: string; slug: string } }) => {
  try {
    const { categoryTitle, slug } = params;

    // Validate the category title
    const category = await validateCategoryTitle(categoryTitle);
    if (!category) {
      return <div>Category not found!</div>;
    }

    // Fetch the blog post by slug
    const BLOG = await getBlogBySlug(slug);
    if (!BLOG) {
      return <div>Blog post not found!</div>;
    }

    return (
      <main className="py-8">
        <section className="max-w-[800px] mx-auto ">
          <section className="grid gap-4">
            <div>
              <Link href="/blogs" className="flex items-center gap-4 text-gray-900 font-medium">
                <IconArrowNarrowLeft size={16} />
                Go Back
              </Link>
              <Title className="h1" order={1}>
                {BLOG.title}
              </Title>
              <Text className="text-sm text-muted">{getFormattedDate(BLOG.publishedAt)}</Text>
            </div>
            <div className="pb-3">
              <Image
                width={800}
                height={400}
                className="w-full mx-auto h-[400px] rounded-lg object-cover"
                src={sanityImage(BLOG.mainImage).url()}
                alt={BLOG.mainImage.alt}
              />
            </div>
          </section>
          <PortableText value={BLOG.body} />
        </section>
        <Divider my="lg" />
        <ContinueReading params={{ slug: slug }} />
      </main>
    );
  } catch (err) {
    return <>{JSON.stringify(err)}</>;
  }
};

export default BlogDetailsPage;
