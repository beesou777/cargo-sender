"use client";
import { Title } from '@mantine/core';
import React from 'react'
import CargoQuoteForm from '@/app/_sections/forms/cargoQuoteForm';
const DashboardPage = () => {
    return (
        <>
        <Title className='h3 p-[10px_0px]'>New Order</Title>
        <CargoQuoteForm />
        </>
);
}

export default DashboardPage