'use client';
import { useDisclosure } from '@mantine/hooks';
import { Button, PasswordInput, Stack } from '@mantine/core';

export default function ChangePassword() {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <div className="bg-white p-4 max-w-[500px] rounded-md mt-5">
      <Stack>
        <PasswordInput
          className="text-muted"
          label="OLD PASSWORD"
          defaultValue="secret"
          visible={visible}
          onVisibilityChange={toggle}
        />
        <PasswordInput
          className="text-muted"
          label="NEW PASSWORD"
          defaultValue="secret"
          visible={visible}
          onVisibilityChange={toggle}
        />
        <Button className="bg-gray-500 w-full">Update Password</Button>
      </Stack>
    </div>
  );
}
