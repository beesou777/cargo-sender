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
        <div className="py-24 px-[24px] text-center text-white grid gap-8 grid-cols-6 safe-area">
            <section className="col-span-6 xl:col-span-4 md:col-span-3 self-center">
                <div className="text-left">
                    <Title
                        order={1}
                        className="text-white lg:!text-[54px] font-bold md:text-4xl text-3xl leading-[1.1]"
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

            <div className="mt-8 xl:col-span-2 md:col-span-3 col-span-6 flex flex-wrap gap-4 place-content-baseline ">
                {uniqueCategories.map((category) => (
                     <Link className="h-fit" key={category._id} href={`/blogs/${category.slug.current}`}>
                     <Button
                         variant="outline"
                         color="white"
                         className="w-fit md:text-[14px] !text-[12px] md:px-8 !px-2 text-white border-white !rounded-full !bg-[rgba(255,_255,_255,_0.07)] hover:!bg-[rgba(255,_255,_255,_0.04)] hover:text-[#1a1a2e]"
                     >
                         {category.title}
                     </Button>
                 </Link>
                ))}
            </div>
        </div>
    );
}
