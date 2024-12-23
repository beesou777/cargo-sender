"use client"; // Error boundaries must be Client Components

import { Button, Title } from "@mantine/core";
import Link from "next/link";

export default function Error() {
  return (
    <main>
      <article className="safe-area">
        <section className="flex gap-4 flex-col mt-[200px] items-center justify-center">
          <Title className="font-semibold" order={1}>
            404: Page Not Found!
          </Title>
          <div className="flex gap-4">
            <Button variant="light" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
            <Link href="/" passHref>
              <Button>Go To Homepage</Button>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
