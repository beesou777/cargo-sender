// ProfileSection.tsx
'use client';
import useAuthStore from '@/store/auth';
import { Badge, Table, Text, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import ChangeEmail from './change-email';
import { useDisclosure } from '@mantine/hooks';

const ProfileSection = () => {
  const authStore = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  const USER = authStore.user;


  return (
    <div className="dash-section">
      <div className="flex gap-3 items-center">
        <Image className="size-28 rounded-full h-[42px] w-[42px]" src={USER?.photoURL!} alt={USER?.displayName!} />
        <Text size="xl" className="font-semibold">
          Welcome back, {USER?.displayName}
        </Text>
      </div>
      <div className="grid grid-cols-6 gap-4">

        <div className="col-span-2 bg-white rounded-lg p-4">
          <Table withRowBorders withColumnBorders>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Name</Table.Td>
                <Table.Td>{USER?.displayName}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Email</Table.Td>
                <Table.Td>{USER?.email ?? '-'}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Verified</Table.Td>
                <Table.Td>
                  <Badge variant="light">{String(USER?.emailVerified)}</Badge>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Phone</Table.Td>
                <Table.Td>{USER?.phoneNumber ?? '-'}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Anonymous</Table.Td>
                <Table.Td>
                  <Badge variant="light">{String(USER?.isAnonymous)}</Badge>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </div>
      {opened && <ChangeEmail close={close} />}
    </div>
  );
};

export default ProfileSection;
