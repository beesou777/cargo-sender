import { useEffect, useState } from "react";
import { Checkbox, CheckboxCard, Text, Title } from "@mantine/core";
import OrderSummerySection from "./orderSummery";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { ServiceType, useGetAQuoteDataStore } from "@/store/quote/quote";
import { InsuranceType } from "@/types/insurance-tab-types";

const InsuranceSection = () => {
  const getAQuoteDataStore = useGetAQuoteDataStore();
  const { quoteData: QUOTE_DATA } = getAQuoteDataStore;
  const quoteResponseStore = useQuoteResponseStore();
  const OPTIONS = quoteResponseStore.quoteResponse?.data?.options;
  const ACTIVE_SERVICE_INDEX =
    OPTIONS?.serviceTypes?.findIndex(
      (service) => service.name === QUOTE_DATA.serviceType,
    ) ?? 0;

  const [insuranceData, setInsuranceData] = useState<InsuranceType | null>(
    null,
  );
  const [serviceTypes, setServiceTypes] = useState<InsuranceType[]>([]);

  useEffect(() => {
    if (OPTIONS?.serviceTypes && ACTIVE_SERVICE_INDEX >= 0) {
      const selectedService = OPTIONS.serviceTypes[ACTIVE_SERVICE_INDEX];
      if (selectedService) {
        setServiceTypes(selectedService as InsuranceType[]);
        getAQuoteDataStore.updateServiceType(
          selectedService.name as ServiceType,
        );
      }
    }
  }, [OPTIONS, ACTIVE_SERVICE_INDEX]);

  useEffect(() => {
    if (
      OPTIONS?.serviceTypes &&
      OPTIONS?.serviceTypes[ACTIVE_SERVICE_INDEX]?.insurances &&
      OPTIONS?.serviceTypes[ACTIVE_SERVICE_INDEX]?.insurances.length !== 0
    ) {
      const firstInsurance =
        OPTIONS.serviceTypes[ACTIVE_SERVICE_INDEX]?.insurances[0];
      const insuranceData: InsuranceType = {
        id: firstInsurance.id ?? 0,
        coverage: firstInsurance.coverage ?? 0,
        text: firstInsurance.text ?? "",
        price: {
          original: {
            currencyCode: firstInsurance.price?.original?.currencyCode ?? "",
            gross: firstInsurance.price?.original?.gross ?? 0,
            net: firstInsurance.price?.original?.net ?? 0,
          },
          converted: {
            currencyCode: firstInsurance.price?.converted?.currencyCode ?? null,
            gross: firstInsurance.price?.converted?.gross ?? null,
            net: firstInsurance.price?.converted?.net ?? null,
          },
        },
      };
      setInsuranceData(insuranceData);
      getAQuoteDataStore.updateInsuranceId(null);
    }
  }, [OPTIONS, ACTIVE_SERVICE_INDEX]);

  const handleInsuranceChange = (insurance: InsuranceType) => {
    getAQuoteDataStore.updateInsuranceId(insurance.id);
    setInsuranceData(insurance);
  };

  return (
    <>
      <div className="flex-1">
        {OPTIONS?.serviceTypes?.[ACTIVE_SERVICE_INDEX]?.insurances?.length ===
        0 ? (
          <div className="cargo-quote-section">
            <div className="grid gap-4">
              <div>
                <Title order={2}>No Insurances Available</Title>
              </div>
            </div>
          </div>
        ) : (
          <article className="grid gap-8">
            <section className="cargo-quote-section">
              <div className="grid gap-4">
                <div>
                  <Title order={2}>Insure your shipment</Title>
                  <Text className="text-gray-400 mt-2">
                    Choose an insurance to protect your order
                  </Text>
                </div>

                {OPTIONS?.serviceTypes?.[ACTIVE_SERVICE_INDEX]?.insurances
                  ?.length === 0 ? (
                  <Text>No insurance data to show</Text>
                ) : (
                  OPTIONS?.serviceTypes?.[
                    ACTIVE_SERVICE_INDEX
                  ]?.insurances?.map((insurance) => {
                    if (!insurance.id) return null;
                    const checked = QUOTE_DATA.insuranceId === insurance.id;
                    return (
                      <CheckboxCard
                        className="rounded-xl shadow-sm"
                        key={insurance.id}
                        onClick={() =>
                          insurance.id !== undefined &&
                          handleInsuranceChange(insurance as InsuranceType)
                        }
                      >
                        <div className="flex p-6 gap-6 items-center">
                          <Checkbox.Indicator
                            radius="lg"
                            size="md"
                            checked={checked}
                          />
                          <div className="grid flex-1">
                            <div className="flex items-center justify-between">
                              <Text className="font-semibold">
                                {insurance.text}
                              </Text>
                              <Text className="text-green-500">
                                {insurance.price?.original?.net}{" "}
                                {insurance.price?.original?.currencyCode}
                              </Text>
                            </div>
                            <Text className="text-gray-400 text-sm">
                              Coverage: {insurance.coverage}
                            </Text>
                          </div>
                        </div>
                      </CheckboxCard>
                    );
                  })
                )}
              </div>
            </section>
          </article>
        )}
      </div>
      <OrderSummerySection
        submitHandler={() => true}
        insuranceData={insuranceData}
        serviceTypes={serviceTypes}
      />
    </>
  );
};
export default InsuranceSection;
