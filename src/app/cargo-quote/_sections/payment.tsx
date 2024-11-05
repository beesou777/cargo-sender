"use client"
import { Icon } from "@iconify/react";
import { Checkbox, CheckboxCard, Text, Title } from "@mantine/core";
import OrderSummerySection from "./orderSummery";

const PaymentSection = () => {
  return (
    <>
      <div className="flex-1">
        <article className="grid gap-8">
          <section className="cargo-quote-section">
            <div className="grid gap-4">
              <Title className="mb-4" order={2}>
                How would you like to pay?
              </Title>
              {/* Credit Card */}
              <CheckboxCard className="rounded-xl shadow-sm">
                <div className="flex p-6 gap-6 items-center">
                  <Checkbox.Indicator radius="lg" size="md" />
                  <div className="flex-1 flex items-center justify-between">
                    <Text>Credit or Debit Card</Text>
                    <div className="flex gap-3 items-center">
                      <Icon className="text-2xl" icon="logos:mastercard" />
                      <Icon className="text-4xl" icon="grommet-icons:amex" />
                      <Icon icon="logos:visa" />
                    </div>
                  </div>
                </div>
              </CheckboxCard>
              {/* Paypal */}
              <CheckboxCard className="rounded-xl shadow-sm">
                <div className="flex p-6 gap-6 items-center">
                  <Checkbox.Indicator radius="lg" size="md" />
                  <div className="flex-1 flex items-center justify-between">
                    <Text>Paypal</Text>
                    <Icon className="text-2xl" icon="logos:paypal" />
                  </div>
                </div>
              </CheckboxCard>
              {/* Bank */}
              <CheckboxCard className="rounded-xl shadow-sm">
                <div className="flex p-6 gap-6 items-center">
                  <Checkbox.Indicator radius="lg" size="md" />
                  <div className="flex-1 flex items-center justify-between">
                    <Text>Bank Transfer</Text>
                    <Icon className="text-2xl" icon="streamline:bank" />
                  </div>
                </div>
              </CheckboxCard>
            </div>
          </section>
        </article>
      </div>
      <OrderSummerySection />
    </>
  );
};

export default PaymentSection;
