import { Icon } from "@iconify/react";
import { ActionIcon, Title } from "@mantine/core";
import React from "react";
import { RESOURCES_CONTENT } from "./_content";
import Link from "next/link";

const ResourceNav = ({ title, slug }: { title: string; slug: string }) => {

    return (
        <Link href={`/resources/${slug}`} passHref className="no-underline text-gray-900">
            <div className="p-6 bg-white rounded-lg shadow flex justify-between items-center cursor-pointer hover:outline hover:outline-1 hover:outline-blue-600">
                <div className="flex gap-4 items-center">
                    <div className="bg-secondary size-10 rounded-lg flex items-center justify-center">
                        <Icon icon="hugeicons:tap-08" className="text-2xl" />
                    </div>
                    <Title order={4}>{title}</Title>
                </div>
                <ActionIcon variant="transparent">
                    <Icon className="text-2xl text-gray-400" icon="weui:arrow-filled" />
                </ActionIcon>
            </div>
        </Link>
    );
};

const ResourcesPage = () => {
    return (
        <main className="bg-backdrop">
            <article className="safe-area grid gap-8 py-8">
                <Title order={3} className="font-semibold">
                    Browse Resource
                </Title>
                <section className="grid gap-8 sm:grid-cols-2">
                    {RESOURCES_CONTENT.RESOURCES.map((contentItem, index) => (
                        <ResourceNav
                            key={contentItem.title}
                            slug={contentItem.slug}
                            title={`${index + 1}. ${contentItem.title}`}
                        />
                    ))}
                </section>
            </article>
        </main>
    );
};

export default ResourcesPage;
