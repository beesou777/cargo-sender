'use client';
import React from 'react';
import { RESOURCES_CONTENT } from '../_content';
import { Accordion, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

const ResourceDetailPage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const RESOURCE_ITEM = RESOURCES_CONTENT.RESOURCES.find((item) => item.slug === slug);
  return (
    <main className="bg-backdrop">
      <article className="safe-area grid gap-8 py-8">
        <div className="flex items-center gap-1">
          <Link href="/">
            <Icon className="size-6 relative top-1" icon="material-symbols-light:home-outline" />
          </Link>
          <Link href="/resources/">/ resources</Link>
          <Link href={`/resources/${RESOURCE_ITEM?.slug}`}>/ {RESOURCE_ITEM?.slug}</Link>
        </div>
        <Title order={2}>{RESOURCE_ITEM?.title}</Title>
        <Accordion chevronPosition="right" variant="separated">
          {RESOURCE_ITEM?.qa_List.map((qaItem, index) => (
            <Accordion.Item
              className="w-full mb-4 rounded-lg border-default bg-white"
              value={qaItem.topic}
              key={qaItem.topic}
            >
              <Accordion.Control className=" w-full px-4 py-2">
                <Text className="font-bold">
                  {index + 1}. {qaItem.topic}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>{qaItem.content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </article>
    </main>
  );
};

export default ResourceDetailPage;
