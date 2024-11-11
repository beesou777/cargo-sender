"use client";

import { Tabs, Title } from "@mantine/core";
import ProfileSection from "./components/profile";
import ChangePassword from "./components/change-password";


export default function Profile() {
    return (
        <>
        <Title> Profile </Title>
        <ProfileSection />
        </>
    );
}