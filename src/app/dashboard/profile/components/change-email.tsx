// change-email.tsx
"use client";

import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import React from "react";

export default function ChangeEmail({ close }: { close: () => void }) {
  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 z-10 flex h-[100vh] w-full items-center justify-center bg-[rgba(0,0,0,0.5)]"
      ></div>

      <div className="fixed left-[40%] top-[40%] z-20 mt-5 w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-4">
        <Stack>
          <TextInput className="text-muted" label="NEW EMAIL" />
          <TextInput className="text-muted" label="CONFIRM EMAIL" />
          <PasswordInput className="text-muted" label="PASSWORD" />
          <div className="flex gap-4">
            <Button onClick={close} className="w-full bg-gray-400">
              Cancel
            </Button>
            <Button className="w-full bg-gray-500">Update Email</Button>
          </div>
        </Stack>
      </div>
    </>
  );
}
