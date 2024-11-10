"use client";

import { Tabs, Title } from "@mantine/core";
import ProfileSection from "./components/profile";
import ChangePassword from "./components/change-password";


export default function Profile() {
    return (
        <>
        <Title> Profile </Title>
        <Tabs defaultValue={'my_details'}>
            <Tabs.List>
                <Tabs.Tab value={'my_details'}>My Details</Tabs.Tab>
                <Tabs.Tab value={'change_password'}> Change Password </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={'my_details'}>
                <ProfileSection />
            </Tabs.Panel>
            <Tabs.Panel value={'change_password'}>
                <ChangePassword />
            </Tabs.Panel>
        </Tabs>
            
        </>
    );
}