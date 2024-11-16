"use client";

import { Title } from "@mantine/core";
import SupportHeader from "./components/SupportHeader";
import SupportResources from "./components/SupportResources";
import InfoSection from "../_sections/info";

export default function Support() {
    return (
        <>
        <div className="bg-[#1a1a2e]">
            <SupportHeader />
        </div>
        <SupportResources />
        <InfoSection />
        </>
    );
}