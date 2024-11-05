import { Checkbox, CheckboxCard, Text, Title } from "@mantine/core";
import OrderSummerySection from "./orderSummery";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { snakeCaseToString } from "@/utils/strings";
import { serviceType, useGetAQuoteDataStore } from "@/store/quote/quote";

const InsuranceSection = () => {
  const getAQuoteDataStore = useGetAQuoteDataStore()
  const { quoteData: QUOTE_DATA } = getAQuoteDataStore;
  const quoteResponseStore = useQuoteResponseStore()
  const OPTIONS = quoteResponseStore.quoteResponse?.data?.options

  const ACTIVE_SERVICE_INDEX = OPTIONS?.serviceTypes!.findIndex(service => service.name! === QUOTE_DATA.serviceType!) ?? 0

  return (
    <>
      <div className="flex-1">
        <article className="grid gap-8">
          <section className="cargo-quote-section">
            <div className="grid gap-4">
              <div>
                <Title order={2}>Choose Service Type</Title>
                <Text className="text-gray-400 mt-2">
                  Choose a service type
                </Text>
              </div>
              {OPTIONS?.serviceTypes?.map((service, index) => {
                return <CheckboxCard
                  key={`service-type-` + index}
                  className="rounded-xl shadow-sm"
                  tabIndex={0}
                  onClick={() => getAQuoteDataStore.updateServiceType(service.name! as serviceType)}
                >
                  <div className="flex p-6 gap-6 items-center">
                    <Checkbox.Indicator radius="lg" size="md" checked={QUOTE_DATA.serviceType === service.name!} />
                    <div className="grid flex-1">
                      <div className="flex items-center justify-between">
                        <Text className="font-bold text-lg">{snakeCaseToString(service.name!)}</Text>
                        <Text className="text-green-500">{`${service.price?.original?.net} ${service.price?.original?.currencyCode}`}</Text>
                      </div>
                    </div>
                  </div>
                </CheckboxCard>
              })}
            </div>
          </section>
          <section className="cargo-quote-section">
            <div className="grid gap-4">
              <div>
                <Title order={2}>Insure your shipment</Title>
                <Text className="text-gray-400 mt-2">
                  Choose an insurance to protect your order
                </Text>
              </div>
              {OPTIONS?.serviceTypes && OPTIONS.serviceTypes[ACTIVE_SERVICE_INDEX].insurances?.map((insurance) => {

                return <CheckboxCard className="rounded-xl shadow-sm" key={insurance.id}>
                  <div className="flex p-6 gap-6 items-center">
                    <Checkbox.Indicator radius="lg" size="md" />
                    <div className="grid flex-1">
                      <div className="flex items-center justify-between">
                        <Text className="font-semibold">
                          {insurance.text}
                        </Text>
                        <Text className="text-green-500">{insurance.price?.original?.net} {insurance.price?.original?.currencyCode}</Text>
                      </div>
                      <Text className="text-gray-400 text-sm">
                        Coverage: {insurance.coverage}
                      </Text>
                    </div>

                  </div>
                </CheckboxCard>
              })}
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
