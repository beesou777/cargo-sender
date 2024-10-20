import { Checkbox, CheckboxCard, Text, Title } from "@mantine/core";
import OrderSummerySection from "./orderSummery";

const InsuranceSection = () => {
  return (
    <>
      <div className="flex-1">
        <article className="grid gap-8">
          <section className="cargo-quote-section">
            <div className="grid gap-4">
              <div>
                <Title order={2}>Insure your shipment</Title>
                <Text className="text-gray-400 mt-2">
                  Choose an insurance to protect your order
                </Text>
              </div>
              <CheckboxCard className="rounded-xl shadow-sm">
                <div className="flex p-6 gap-6 items-center">
                  <Checkbox.Indicator radius="lg" size="md" />
                  <div className="grid flex-1">
                    <div className="flex items-center justify-between">
                      <Text className="font-bold text-lg">Standard</Text>
                      <Text className="text-green-500">Free of Cost</Text>
                    </div>
                    <Text className="text-gray-400 text-sm">
                      Choose an insurance to protect your order
                    </Text>
                  </div>
                </div>
              </CheckboxCard>
            </div>
          </section>
          <section className="cargo-quote-section">
            <div className="grid gap-4">
              <Title order={2}>Not sure if you will be home?</Title>

              <CheckboxCard className="rounded-xl shadow-sm">
                <div className="flex p-6 gap-6 items-center">
                  <Checkbox.Indicator radius="lg" size="md" />
                  <div className="grid flex-1">
                    <div className="flex items-center justify-between">
                      <Text className="font-bold text-lg">
                        Add Flexible changes
                      </Text>
                      <Text className="text-green-500">$65.5</Text>
                    </div>
                    <Text className="text-gray-400 text-sm">
                      Choose an insurance to protect your order
                    </Text>
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

export default InsuranceSection;
