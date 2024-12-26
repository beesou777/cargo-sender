"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Checkbox,
  CheckboxCard,
  Text,
  Title,
  Button,
  TextInput,
  Group,
  Stack,
  Box,
} from "@mantine/core";
import OrderSummerySection from "./orderSummery";

const PaymentSection = () => {
  const [selectedPayment, setSelectedPayment] = useState("Revolout");

  // Handle payment selection

  const payWithRevolout = () => {
    return true;
  };

  return (
    <>
      <div className="flex-1">
        <article className="grid gap-8">
          <section className="cargo-quote-section">
            <div className="grid gap-4">
              <Title className="mb-4" order={2}>
                How would you like to pay?
              </Title>
              {/* Credit or Debit Card */}

              <CheckboxCard
                className={`rounded-xl shadow-sm ${selectedPayment === "Revolout" ? "bg-blue-50" : ""}`}
                onClick={() => setSelectedPayment("Revolout")}
              >
                <div className="flex items-start gap-6 p-6">
                  <Checkbox
                    radius="lg"
                    size="md"
                    checked={selectedPayment === "Revolout"}
                    readOnly
                  />
                  <div className="flex w-full flex-col">
                    <div className="flex w-full flex-1 items-center justify-between">
                      <Text>Revolout</Text>
                      <Icon className="text-2xl" icon="logos:Revolout" />
                    </div>
                    {selectedPayment === "Revolout" && (
                      <div className="mt-6">
                        <p>
                          <p>You will be redirected to the Revolout website</p>
                        </p>
                        {/* <Button
                          size="lg"
                          className="mt-4 !bg-gray-950 "
                          fullWidth
                          onClick={() => payWithRevolout()}
                        >
                          Continue With Revolout
                        </Button> */}
                      </div>
                    )}
                  </div>
                </div>
              </CheckboxCard>
            </div>
          </section>
        </article>
      </div>
      <OrderSummerySection submitHandler={() => payWithRevolout()} />
    </>
  );
};

export default PaymentSection;
