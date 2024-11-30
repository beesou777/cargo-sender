"use client";

import CareerHeader from "./components/CareerHeader";
import MissionValues from "./components/MissionValues";
import CareerSection from "./components/Career";

export default function Career() {
    return (
        <>
            <div className="bg-[#171F7B]">
                <CareerHeader />
            </div>
            <div className="md:py-[80px] py-[60px]">
                <MissionValues />
                <CareerSection />
            </div>
        </>
    )
}