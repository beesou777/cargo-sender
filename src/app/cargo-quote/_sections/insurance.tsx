import { useEffect, useState } from "react";
import { Checkbox, CheckboxCard, Text, Title } from "@mantine/core";
import OrderSummerySection from "./orderSummery";
import { useQuoteResponseStore } from "@/store/quote/quoteResponse";
import { snakeCaseToString } from "@/utils/strings";
import { serviceType, useGetAQuoteDataStore } from "@/store/quote/quote";

type InsuranceType = {
  id: number;
  coverage: number;
  text: string;
  price: {
    converted: {
      currencyCode: string | null;
      gross: number | null;
      net: number | null;
    } | null;
    original: {
      currencyCode: string;
      gross: number;
      net: number;
    };
  };
};

const InsuranceSection = () => {
  const getAQuoteDataStore = useGetAQuoteDataStore();
  const { quoteData: QUOTE_DATA } = getAQuoteDataStore;
  const quoteResponseStore = useQuoteResponseStore();
  const OPTIONS = quoteResponseStore.quoteResponse?.data?.options;
  const ACTIVE_SERVICE_INDEX = OPTIONS?.serviceTypes?.findIndex(
    (service) => service.name === QUOTE_DATA.serviceType
  ) ?? 0;

  const [insuranceData, setInsuranceData] = useState<InsuranceType | null>(null);
  const [serviceTypes, setServiceTypes] = useState([]);

  useEffect(() => {
    if (OPTIONS?.serviceTypes && ACTIVE_SERVICE_INDEX >= 0) {
      const selectedService = OPTIONS.serviceTypes[ACTIVE_SERVICE_INDEX];
      if (selectedService) {
        setServiceTypes(selectedService);
        getAQuoteDataStore.updateServiceType(selectedService.name); // Update serviceType
      }
    }
  }, [OPTIONS, ACTIVE_SERVICE_INDEX]);

  useEffect(() => {
    if (OPTIONS?.serviceTypes && OPTIONS.serviceTypes[ACTIVE_SERVICE_INDEX].insurances && OPTIONS.serviceTypes[ACTIVE_SERVICE_INDEX].insurances.length !== 0) {
      const firstInsurance = OPTIONS.serviceTypes[ACTIVE_SERVICE_INDEX].insurances[0];
      const insuranceData: InsuranceType = {
        id: firstInsurance.id ?? 0,
        coverage: firstInsurance.coverage ?? 0,
        text: firstInsurance.text ?? '',
        price: {
          original: {
            currencyCode: firstInsurance.price?.original?.currencyCode ?? '',
            gross: firstInsurance.price?.original?.gross ?? 0,
            net: firstInsurance.price?.original?.net ?? 0,
          },
          converted: firstInsurance.price?.converted ?? null
        },
      };
      setInsuranceData(insuranceData);
      getAQuoteDataStore.updateInsuranceId(firstInsurance.id ?? null);
    }
  }, [OPTIONS, ACTIVE_SERVICE_INDEX]);

  // Reset insurance selection if service type changes
  useEffect(() => {
    if (OPTIONS?.serviceTypes) {
      const selectedService = OPTIONS.serviceTypes[ACTIVE_SERVICE_INDEX];
      if (selectedService && selectedService.insurances?.length > 0) {
        const firstInsurance = selectedService.insurances[0];
        if (firstInsurance?.id) {
          getAQuoteDataStore.updateInsuranceId(firstInsurance.id);
        } else {
          // Handle case when firstInsurance does not have an id
          getAQuoteDataStore.updateInsuranceId(null);
        }
      } else {
        // Handle case when no insurances are available
        getAQuoteDataStore.updateInsuranceId(null);
      }
    }
  }, [ACTIVE_SERVICE_INDEX, OPTIONS?.serviceTypes]);
  

  const handleInsuranceChange = (insurance: InsuranceType) => {
    getAQuoteDataStore.updateInsuranceId(insurance.id);
    setInsuranceData(insurance);
  };

  const updateService = (service: any) =>{
    setServiceTypes(service)
    getAQuoteDataStore.updateServiceType(service.name! as serviceType)
  }

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
                return (
                  <CheckboxCard
                    key={`service-type-` + index}
                    className="rounded-xl shadow-sm"
                    tabIndex={0}
                    onClick={() => updateService(service) }
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
                );
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
    {/* Check if insurances array is available and not empty */}
    {OPTIONS?.serviceTypes?.[ACTIVE_SERVICE_INDEX]?.insurances?.length === 0 ? (
      <Text>No insurance data to show</Text> 
    ) : (
      OPTIONS?.serviceTypes?.[ACTIVE_SERVICE_INDEX]?.insurances?.map((insurance) => {
        if (!insurance.id) return null;  // Guard clause to avoid issues with undefined id
        const checked = QUOTE_DATA.insuranceId === insurance.id;
        return (
          <CheckboxCard
            className="rounded-xl shadow-sm"
            key={insurance.id}
            onClick={() => insurance.id !== undefined && handleInsuranceChange(insurance)}
          >
            <div className="flex p-6 gap-6 items-center">
              <Checkbox.Indicator radius="lg" size="md" checked={checked} />
              <div className="grid flex-1">
                <div className="flex items-center justify-between">
                  <Text className="font-semibold">{insurance.text}</Text>
                  <Text className="text-green-500">
                    {insurance.price?.original?.net} {insurance.price?.original?.currencyCode}
                  </Text>
                </div>
                <Text className="text-gray-400 text-sm">Coverage: {insurance.coverage}</Text>
              </div>
            </div>
          </CheckboxCard>
        );
      })
    )}
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
                      <Text className="font-bold text-lg">Add Flexible changes</Text>
                      <Text className="text-green-500">$65.5</Text>
                    </div>
                    <Text className="text-gray-400 text-sm">Choose an insurance to protect your order</Text>
                  </div>
                </div>
              </CheckboxCard>
            </div>
          </section>
        </article>
      </div>
      <OrderSummerySection submitHandler={() => true} insuranceData={insuranceData} serviceTypes={serviceTypes} />
    </>
  );
};

export default InsuranceSection;
