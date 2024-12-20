"use client";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ActionIcon, Text, Title } from "@mantine/core";
import clsx from "clsx";
import React, { useState } from "react";
import { useSteeper } from "@/store/step";

const WarningsSections = () => {
  const QUOTE_RESPONSE = useQuoteResponseStore();
  const [isPin, SetIsPin] = useState(true);
  const { activeStep, setStep } = useSteeper();
  if (
    !QUOTE_RESPONSE.quoteResponse?.data?.warnings?.length &&
    !QUOTE_RESPONSE.quoteReject
  )
    return <></>;

  return (
    <>
    {
      activeStep !== 1 && activeStep !== 0 && (
    <section
      className={clsx(
        "grid gap-4 p-8 mt-4 z-10 bg-red-100 border-default border-t-red-600",
        isPin && "sticky -bottom-4",
      )}
    >
          <div className="flex gap-4 justify-between items-start">
            <div>
              <Title order={3}>Errors & Warnings</Title>
              <Text className="text-gray-600 text-sm mt-1">
                Press &quot;Continue&quot; and check if the warnings still persist.
              </Text>
            </div>
            <ActionIcon
              radius="lg"
              variant="light"
              color={isPin ? "red" : "dark"}
              onClick={() => SetIsPin(!isPin)}
            >
              <Icon icon="tabler:pin-filled" />
            </ActionIcon>
          </div>
     
      {QUOTE_RESPONSE.quoteResponse?.data.warnings && (
        <div className="grid gap-1">
          {QUOTE_RESPONSE.quoteResponse?.data?.warnings.map((error) => (
            <div
              className="text-xs bg-white text-yellow-600 with-icon p-3 py-2 rounded"
              key={error.message}
            >
              <Icon className="text-xl" icon="fe:warning" />
              <span className="font-normal">
                <span className="font-semibold">{error.parameterPath}</span>:{" "}
                {error.message}
              </span>
            </div>
          ))}
        </div>
      )}
      {QUOTE_RESPONSE.quoteReject && (
        <div className="grid gap-1">
          {QUOTE_RESPONSE.quoteReject?.details?.violations?.map(
            (error, index) => (
              <div
                className="text-xs bg-white text-red-600 with-icon p-3 py-2 rounded"
                color="red"
                key={error.propertyPath + index}
              >
                <Icon className="text-xl" icon="material-symbols:warning" />
                <span className="font-normal">
                  <span className="font-semibold">{error.propertyPath}</span>:{" "}
                  {error.message}
                </span>
              </div>
            ),
          )}
          {QUOTE_RESPONSE.quoteReject.details?.warnings?.map((error, index) => (
            <div
              className="text-xs bg-white text-red-600 with-icon p-3 py-2 rounded"
              color="red"
              key={error.parameterPath + index}
            >
              <Icon className="text-xl" icon="material-symbols:warning" />
              <span className="font-normal">
                <span className="font-semibold">
                  {error.parameterPath}
                  {error.code && `(${error.code})`}
                </span>
                : {error.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
    )
  }
    </>
  );
};

export default WarningsSections;
