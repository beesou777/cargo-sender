import { Title, Text, TextInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import SanityClient from "@/sanity/client";
import Link from "next/link";

interface Categories {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

export interface BlogMeta {
  _id: string;
  categories: Categories[];
}

const blogsQuery = `*[_type=="post"] {
    _id, 
    categories[]->{title, _id, slug}
}`;

async function getBlogs() {
  const result = await SanityClient.fetch<BlogMeta[]>(blogsQuery);
  return result;
}

// Utility function to get unique categories
function getUniqueCategories(blogs: BlogMeta[]): Categories[] {
  const categoryMap = new Map<string, Categories>();
  blogs.forEach((blog) => {
    blog.categories.forEach((category) => {
      if (!categoryMap.has(category.slug.current)) {
        categoryMap.set(category.slug.current, category);
      }
    });
  });
  return Array.from(categoryMap.values());
}

export default async function BlogHeader() {
  const blogs = await getBlogs();
  const uniqueCategories = getUniqueCategories(blogs);

  return (
    <div className="safe-area grid grid-cols-6 gap-8 px-[24px] py-24 text-center text-white">
      <section className="col-span-6 self-center md:col-span-3 xl:col-span-4">
        <div className="text-left">
          <Title
            order={1}
            className="text-3xl font-bold leading-[1.1] text-white md:text-4xl lg:!text-[54px]"
          >
            News, Insights, <br /> Tutorials & More
          </Title>
          <Text size="lg" className="mt-2">
            Learn more about Cargosender
          </Text>
        </div>

        <div className="mt-6 max-w-md">
          <TextInput
            placeholder="Search..."
            size="lg"
            leftSection={<IconSearch />}
            classNames={{
              input: "bg-white text-black rounded-lg px-4 py-3",
            }}
          />
        </div>
      </section>

      <div className="col-span-6 mt-8 flex flex-wrap place-content-baseline gap-4 md:col-span-3 xl:col-span-2">
        {uniqueCategories.map((category) => (
          <Link
            className="h-fit"
            key={category._id}
            href={`/blogs/${category.slug.current}`}
          >
            <Button
              variant="outline"
              color="white"
              className="w-fit !rounded-full border-white !bg-[rgba(255,_255,_255,_0.07)] !px-2 !text-[12px] text-white hover:!bg-[rgba(255,_255,_255,_0.04)] hover:text-[#1a1a2e] md:px-8 md:text-[14px]"
            >
              {category.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
