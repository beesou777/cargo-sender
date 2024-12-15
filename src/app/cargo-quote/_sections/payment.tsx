"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Checkbox, CheckboxCard, Text, Title, Button, TextInput, Group, Stack, Box } from "@mantine/core";
import OrderSummerySection from "./orderSummery";

const PaymentSection = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Handle payment selection
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
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
                className={`rounded-xl shadow-sm ${selectedPayment === "Credit or Debit Card" ? "bg-blue-50" : ""
                  }`}
                onClick={() => handlePaymentSelect("Credit or Debit Card")}
              >
                <div className="flex p-6 gap-6 items-center">
                  <Checkbox
                    radius="lg"
                    size="md"
                    checked={selectedPayment === "Credit or Debit Card"}
                    readOnly
                  />
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
              {selectedPayment === "Credit or Debit Card" && (
                // <form className="grid gap-4">
                //   <div>
                //     <label htmlFor="cardNumber">Card Number</label>
                //     <input
                //       type="text"
                //       id="cardNumber"
                //       placeholder="Enter card number"
                //       className="w-full p-2 border rounded"
                //     />
                //   </div>
                //   <div>
                //     <label htmlFor="expiry">Expiry Date</label>
                //     <input
                //       type="text"
                //       id="expiry"
                //       placeholder="MM/YY"
                //       className="w-full p-2 border rounded"
                //     />
                //   </div>
                //   <div>
                //     <label htmlFor="cvv">CVV</label>
                //     <input
                //       type="text"
                //       id="cvv"
                //       placeholder="Enter CVV"
                //       className="w-full p-2 border rounded"
                //     />
                //   </div>
                // </form>
                <Box mt="md">
                    <Stack gap="md">
                      <TextInput
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                      />
                      <Group grow>
                        <TextInput
                          label="Expiry Date"
                          placeholder="MM/YY"
                        />
                        <TextInput
                          label="CVC / CVV"
                          placeholder="123"
                        />
                      </Group>
                      <Group grow>
                        <TextInput
                          label="Postal Code"
                          placeholder="112366"
                        />
                        <TextInput
                          label="City"
                          placeholder="Warsaw"
                        />
                      </Group>
                      <TextInput
                        label="Name on Card"
                        placeholder="J. Smith"
                      />
                    </Stack>
                  </Box>

              )}

              {/* PayPal */}
              <CheckboxCard
                className={`rounded-xl shadow-sm ${selectedPayment === "Paypal" ? "bg-blue-50" : ""
                  }`}
                onClick={() => handlePaymentSelect("Paypal")}
              >
                <div className="flex p-6 gap-6 items-start">
                  <Checkbox
                    radius="lg"
                    size="md"
                    checked={selectedPayment === "Paypal"}
                    readOnly
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex-1 flex items-center justify-between w-full">
                      <Text>Paypal</Text>
                      <Icon className="text-2xl" icon="logos:paypal" />
                    </div>
                    {selectedPayment === "Paypal" && (
                      <div className="mt-6">
                        <p>
                          <p>You will be redirected to the PayPal website</p>
                        </p>
                        <Button
                          className="mt-4 !bg-secondary"
                          fullWidth
                          onClick={() => window.open("https://paypal.com", "_blank")}
                        >
                          Pay with 
                          <Icon className="ml-2" icon="logos:paypal" /> 
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CheckboxCard>

              {/* Bank Transfer */}
              <CheckboxCard
                className={`rounded-xl shadow-sm  ${selectedPayment === "Bank Transfer" ? "bg-blue-50" : ""
                  }`}
                onClick={() => handlePaymentSelect("Bank Transfer")}
              >
                <div className="flex p-6 gap-6 items-start">
                  <Checkbox
                    radius="lg"
                    size="md"
                    checked={selectedPayment === "Bank Transfer"}
                    readOnly
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex-1 flex items-center justify-between w-full">
                      <Text>Bank Transfer</Text>
                      <Icon className="text-2xl" icon="streamline:bank" />
                    </div>
                    {selectedPayment === "Bank Transfer" && (
                      <div className="mt-6">
                        <p>
                          Please note that your order will only be processed once the
                          payment is received.
                        </p>
                        <div className="mt-4 bg-[#F8F8F9] p-4 rounded-md border">
                          <p>
                            <strong>Bank Account Details:</strong>
                          </p>
                          <ul className="list-disc ml-6">
                            <li>Account Number: 1232000000010000000011</li>
                            <li>Swift Code: ABCD1234</li>
                            <li>Bank Name: Example Bank</li>
                            <li>Other Details: Reference Code 12345</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CheckboxCard>
            </div>
          </section>
        </article>
      </div>
      <OrderSummerySection submitHandler={() => true} />
    </>
  );
};

export default PaymentSection;
