"use client";

import { Title, Text, Box, Paper } from "@mantine/core";
import Image from "next/image";

export default function MultiCarrier() {
  return (
    <article
      className="grid justify-items-center py-8 text-white"
      style={{
        backgroundImage:
          "url('/assets/images/multi-carrier/multi-carrier.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "70vh",
      }}
    >
      <section className="safe-area py-8">
        <Box
          pos="relative"
          className="flex lg:block"
          style={{
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div className="hidden lg:block">
            <Paper
              shadow="sm"
              p="sm"
              pos="absolute"
              style={{ left: "15%", top: "25%", transform: "rotate(-5deg)" }}
              bg="white"
            >
              <Image
                src="/assets/icons/trusted-companies/Dana2x.svg"
                alt="DHL"
                width={100}
                height={24}
              />
            </Paper>

            <Paper
              shadow="sm"
              p="sm"
              pos="absolute"
              style={{ left: "15%", bottom: "35%", transform: "rotate(5deg)" }}
              bg="white"
            >
              <Image
                src="/assets/icons/trusted-companies/Yazaki2x.svg"
                alt="DPD"
                width={100}
                height={24}
              />
            </Paper>

            <Paper
              shadow="sm"
              p="sm"
              pos="absolute"
              style={{ right: "15%", top: "25%", transform: "rotate(3deg)" }}
              bg="white"
            >
              <Image
                src="/assets/icons/trusted-companies/Magna2x.svg"
                alt="DHL"
                width={100}
                height={24}
              />
            </Paper>

            <Paper
              shadow="sm"
              p="sm"
              pos="absolute"
              style={{
                right: "15%",
                bottom: "35%",
                transform: "rotate(-3deg)",
              }}
              bg="white"
            >
              <Image
                src="/assets/icons/trusted-companies/Izipizi2x.svg"
                alt="GLS"
                width={100}
                height={24}
              />
            </Paper>

            <Paper
              shadow="sm"
              p="sm"
              pos="absolute"
              style={{
                left: "50%",
                top: "80%",
                transform: "translate(-50%, -50%)",
              }}
              bg="white"
            >
              <Image
                src="/assets/icons/trusted-companies/Carestream2x.svg"
                alt="FEDEX"
                width={100}
                height={24}
              />
            </Paper>
          </div>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4 lg:hidden">
            <Paper
              shadow="sm"
              p="sm"
              className="transform rounded-lg bg-white transition-transform hover:scale-105"
            >
              <Image
                src="/assets/icons/trusted-companies/Dana2x.svg"
                alt="FedEx"
                width={100}
                height={24}
              />
            </Paper>

            <Paper
              shadow="sm"
              p="sm"
              className="transform rounded-lg bg-white transition-transform hover:scale-105"
            >
              <Image
                src="/assets/icons/trusted-companies/Yazaki2x.svg"
                alt="DPD"
                width={100}
                height={24}
              />
            </Paper>

            <Paper
              shadow="sm"
              p="sm"
              className="transform rounded-lg bg-white transition-transform hover:scale-105"
            >
              <Image
                src="/assets/icons/trusted-companies/Magna2x.svg"
                alt="DHL"
                width={100}
                height={24}
              />
            </Paper>

            <Paper
              shadow="sm"
              p="sm"
              className="transform rounded-lg bg-white transition-transform hover:scale-105"
            >
              <Image
                src="/assets/icons/trusted-companies/Izipizi2x.svg"
                alt="GLS"
                width={100}
                height={24}
              />
            </Paper>

            <Paper
              shadow="sm"
              p="sm"
              className="transform rounded-lg bg-white transition-transform hover:scale-105"
            >
              <Image
                src="/assets/icons/trusted-companies/Carestream2x.svg"
                alt="UPS"
                width={100}
                height={24}
              />
            </Paper>
          </div>

          <Box
            style={{
              textAlign: "center",
              color: "white",
              maxWidth: 600,
              margin: "0 auto",
              marginBottom: "2rem",
              padding: "50px 0",
              zIndex: 1,
            }}
          >
            <Title
              order={1}
              size="h1"
              mb="md"
              style={{
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              Multi Carrier: the best <br /> transport service for each <br />{" "}
              shipment
            </Title>
            <Text size="lg">
              Send your parcels with trustworthy national and <br />{" "}
              International delivery companies
            </Text>
          </Box>
        </Box>
      </section>
    </article>
  );
}
