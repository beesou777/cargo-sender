// ProfileSection.tsx
'use client';
import useAuthStore from '@/store/auth';
import { Badge, Table, Text, TextInput, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import ChangeEmail from './change-email';
import { useDisclosure } from '@mantine/hooks';

const ProfileSection = () => {
  const authStore = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  const USER = authStore.user;

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      displayName: USER?.displayName || '',
      provider: USER?.providerData[0]?.providerId || '',
      phone: USER?.providerData[0]?.phoneNumber || '',
      email: USER?.email || '',
    },
  });

  return (
    <div className="dash-section">
      <div className="flex gap-3 items-center">
        <Image className="size-28 rounded-full h-[42px] w-[42px]" src={USER?.photoURL!} alt={USER?.displayName!} />
        <Text size="xl" className="font-semibold">
          Welcome back, {USER?.displayName}
        </Text>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <form className="bg-white p-4 rounded-lg max-w-[500px] col-span-2">
          <TextInput
            className="my-2"
            withAsterisk
            label="FIRST NAME"
            placeholder="Your name"
            key={form.key('displayName')}
            {...form.getInputProps('displayName')}
          />
          <TextInput
            className="my-2"
            withAsterisk
            label="PROVIDER NAME"
            disabled
            placeholder="provider"
            key={form.key('provider')}
            {...form.getInputProps('provider')}
          />
          <TextInput
            className="my-2"
            withAsterisk
            label="PHONE NUMBER"
            placeholder="Your phone number"
            key={form.key('phone')}
            {...form.getInputProps('phone')}
          />
          <TextInput
      className="my-2"
      style={{ 
        label:{
            width:"100%"
        }
       }}
      label={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',width:"100%" }}>
          <span>E-MAIL</span>
          <button
            onClick={open}
            style={{
              background: 'none',
              border: 'none',
              color: '#1c7ed6',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0
            }}
          >
            Change email
          </button>
        </div>
      }
      placeholder="allservice.portugal@gmail.com"
      disabled
      styles={{
        label: { width: '100%' },
      }}
    />
        </form>

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
