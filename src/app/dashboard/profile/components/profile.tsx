'use client';
import useAuthStore from '@/store/auth';
import { Badge, Table, Text, Image, Button } from '@mantine/core';
import React from 'react';

const ProfileSection = () => {
  const authStore = useAuthStore();
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

        <section className="xl:col-span-2 col-span-6 bg-white rounded-lg p-4">
        <Table.ScrollContainer minWidth={1024}>
          
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
        </Table.ScrollContainer>
        </section>
        <section className="xl:col-span-2 col-span-6 bg-white rounded-lg p-4">
          <div className="">
            <div className="flex">
              <Text size="md" className="font-semibold">
                Suspend account
              </Text>
            </div>
            <Text className="text-muted">
            Suspending account will temporarily block your access to creating new orders, as well as receiving any sort of correspondence from Eurosender. Your data also will become unavailable for us to access. You can revert this at any time by contacting with our customer support.
            </Text>
            <Button className='mt-4' variant="filled" color="rgba(209, 207, 207, 1)">Suspend Account</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileSection;
