"use client"
import useAuthStore from '@/store/auth'
import { Badge, Table, TableData, Title } from '@mantine/core'
import React from 'react'

const ProfileSection = () => {
    const authStore = useAuthStore()
    const USER = authStore.user
    const tableData: TableData = {
        body: [
            ["Name:", USER?.displayName],
            ["Email:", USER?.email ?? "-"],
            ["Verified:", <Badge variant='light'>{String(USER?.emailVerified)}</Badge>],
            ["Phone:", USER?.phoneNumber ?? "-"],
            ["Anonymous", <Badge variant='light'>{String(USER?.isAnonymous)}</Badge>]
        ],
    };
    return (
        <div className='dash-section'>
            <Title>Profile Info</Title>
            <div>
                <img className='size-28 rounded-lg' src={USER?.photoURL!} alt={USER?.displayName!} />
                <Title order={2} className='font-semibold'>{USER?.displayName}</Title>
            </div>

            <div className="section-block">
                <Table withRowBorders withColumnBorders data={tableData} />
            </div>
        </div>
    )
}

export default ProfileSection