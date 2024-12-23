// change-email.tsx
'use client';

import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import React from 'react';

export default function ChangeEmail({ close }: { close: () => void }) {
  return (
    <>
      <div
        onClick={close}
        className="h-[100vh] fixed bg-[rgba(0,0,0,0.5)] w-full inset-0 flex justify-center items-center z-10"
      ></div>

      <div className="bg-white p-4 max-w-[500px] w-full rounded-md mt-5 z-20 fixed top-[40%] left-[40%] translate-x-[-50%] translate-y-[-50%]">
        <Stack>
          <TextInput className="text-muted" label="NEW EMAIL" />
          <TextInput className="text-muted" label="CONFIRM EMAIL" />
          <PasswordInput className="text-muted" label="PASSWORD" />
          <div className="flex gap-4">
            <Button onClick={close} className="bg-gray-400 w-full">
              Cancel
            </Button>
            <Button className="bg-gray-500 w-full">Update Email</Button>
          </div>
        </Stack>
      </div>
    </>
  );
}
