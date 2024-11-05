"use client"
import useAuthStore from '@/store/auth'
import { Badge, Table, TableData, Title } from '@mantine/core'
import React from 'react'

const ProfileSection = () => {
    const authStore = useAuthStore()
    const USER = authStore.user



    return (
        <div className='dash-section'>
            <Title>Profile Info</Title>
            <div>
                <img className='size-28 rounded-lg' src={USER?.photoURL!} alt={USER?.displayName!} />
                <Title order={2} className='font-semibold'>{USER?.displayName}</Title>
            </div>

            <div className="section-block">
                <Table withRowBorders withColumnBorders>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>Name</Table.Td>
                            <Table.Td>{USER?.displayName}</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td>Email</Table.Td>
                            <Table.Td>{USER?.email ?? "-"}</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td>Verified</Table.Td>
                            <Table.Td><Badge variant='light'>{String(USER?.emailVerified)}</Badge></Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td>Phone</Table.Td>
                            <Table.Td>{USER?.phoneNumber ?? "-"}</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Td>Anonymous</Table.Td>
                            < Table.Td><Badge variant='light'>{String(USER?.isAnonymous)}</Badge></Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    )
}

export default ProfileSection