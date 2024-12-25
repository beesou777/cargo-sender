'use client';
import CargoInput from '@/components/inputs/cargo';
import CountrySelect, { countryType } from '@/components/inputs/countySelect';
import { Icon } from '@iconify/react';
import { ActionIcon, Button, Modal, Text, Title, Checkbox, CheckboxCard, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { FormEvent } from 'react';
import OrderSummerySection from './orderSummery';
import { useShipmentStore } from '@/store/quote/shipment';
import { useQuoteSharedStore } from '@/store/quote/quoteSharedStore';
import { notifications } from '@mantine/notifications';
import { useQuoteResponseStore } from '@/store/quote/quoteResponse';
import { useGetAQuote } from '@/hooks/useGetAQuote';
import { snakeCaseToString } from '@/utils/strings';
import { ServiceType, useGetAQuoteDataStore } from '@/store/quote/quote';

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

const BaseInformationSection = () => {
  const quoteDataStore = useGetAQuoteDataStore();
  const getAQuoteDataStore = useGetAQuoteDataStore();
  const quoteResponseStore = useQuoteResponseStore();
  const { quoteData: QUOTE_DATA } = quoteDataStore;
  const shipmentStore = useShipmentStore();
  const quoteSharedStore = useQuoteSharedStore();

  const getAQuote = useGetAQuote();
  const [serviceTypes, setServiceTypes] = React.useState<InsuranceType[]>([]);

  const [isServiceData, setisServiceData] = React.useState(false);

  const { deliveryCountry: DELIVERY_COUNTRY, pickupCountry: PICKUP_COUNTRY } = quoteSharedStore;

  const [opened, { open, close }] = useDisclosure(false);
  const OPTIONS = quoteResponseStore.quoteResponse?.data?.options;
  const warnings = quoteResponseStore.quoteResponse?.data?.warnings;

  const countryFlags = {
    Collect: PICKUP_COUNTRY?.code
      ? `flagpack:${(PICKUP_COUNTRY?.code as string).toLocaleLowerCase()}`
      : 'carbon:flag-filled',
    Deliver: DELIVERY_COUNTRY?.code
      ? `flagpack:${(DELIVERY_COUNTRY?.code as string).toLocaleLowerCase()}`
      : 'carbon:flag-filled',
  };

  function submitHandler() {
    const { pallets, envelopes, packages } = QUOTE_DATA.parcels || {};
    let hasErrors = false;
    const deliveryCountry = DELIVERY_COUNTRY?.code || null;
    const pickupCountry = PICKUP_COUNTRY?.code || null;
    const senderAddress = {
      country: deliveryCountry,
      zip: null,
      city: null,
      cityId: null,
      street: null,
      additionalInfo: null,
      region: null,
      regionCode: null,
      regionId: null,
      timeZoneName: null,
      customFields: [],
    };

    const receiverAddress = {
      country: pickupCountry,
      zip: null,
      city: null,
      cityId: null,
      street: null,
      additionalInfo: null,
      region: null,
      regionCode: null,
      regionId: null,
      timeZoneName: null,
      customFields: [],
    };

    // Set the addresses
    shipmentStore.setShipmentAddress('deliveryAddress', senderAddress);
    shipmentStore.setShipmentAddress('pickupAddress', receiverAddress);

    const errors: {
      packages: string[][];
      pallets: string[][];
      envelopes: string[][];
    } = {
      packages: [],
      pallets: [],
      envelopes: [],
    };

    // Validate Packages
    if (packages && packages.length > 0) {
      packages.forEach((pkg, index) => {
        const packageErrors = [];
        if ((pkg?.height ?? 0) <= 0) packageErrors.push('Height is required.');
        if ((pkg?.length ?? 0) <= 0) packageErrors.push('Length is required.');
        if (!pkg?.parcelId) packageErrors.push('Parcel ID is required.');
        if ((pkg?.quantity ?? 0) <= 0) packageErrors.push('Quantity must be greater than 0.');
        if ((pkg?.value ?? 0) <= 0) packageErrors.push('Value must be greater than 0.');
        if ((pkg?.weight ?? 0) <= 0) packageErrors.push('Weight is required.');
        if ((pkg?.width ?? 0) <= 0) packageErrors.push('Width is required.');

        if (packageErrors.length > 0) {
          errors.packages[index] = packageErrors;
          hasErrors = true;
        }
      });
    }

    // Validate Pallets
    if (pallets && pallets.length > 0) {
      pallets.forEach((pkg, index) => {
        const palletErrors = [];
        if ((pkg?.height ?? 0) <= 0) palletErrors.push('Height is required.');
        if ((pkg?.length ?? 0) <= 0) palletErrors.push('Length is required.');
        if (!pkg?.parcelId) palletErrors.push('Parcel ID is required.');
        if ((pkg?.quantity ?? 0) <= 0) palletErrors.push('Quantity must be greater than 0.');
        if ((pkg?.value ?? 0) <= 0) palletErrors.push('Value must be greater than 0.');
        if ((pkg?.weight ?? 0) <= 0) palletErrors.push('Weight is required.');
        if ((pkg?.width ?? 0) <= 0) palletErrors.push('Width is required.');

        if (palletErrors.length > 0) {
          if (errors.pallets) {
            errors.pallets[index] = palletErrors;
          }
          hasErrors = true;
        }
      });
    }

    // Validate Envelopes
    if (envelopes && envelopes.length > 0) {
      envelopes.forEach((pkg, index) => {
        const envelopeErrors = [];
        if (!pkg?.parcelId) envelopeErrors.push('Parcel ID is required.');
        if ((pkg?.quantity ?? 0) <= 0) envelopeErrors.push('Quantity must be greater than 0.');
        if ((pkg?.weight ?? 0) <= 0) envelopeErrors.push('Weight is required.');

        if (envelopeErrors.length > 0) {
          errors.envelopes[index] = envelopeErrors;
          hasErrors = true;
        }
      });
    }

    // If there are errors, show them and stop submission
    if (hasErrors) {
      // Update UI with errors
      Object.entries(errors).forEach(([type, typeErrors]) => {
        typeErrors.forEach((fieldErrors, index) => {
          if (fieldErrors && Array.isArray(fieldErrors)) {
            notifications.show({
              title: `Error in ${type}`,
              message: fieldErrors.join(' '),
              color: 'red',
            });
          }
        });
      });
      return false;
    }

    return true;
  }

  const getSelectedParcelType = () => {
    const { pallets, envelopes, packages } = QUOTE_DATA.parcels || {};

    if (pallets && pallets.length > 0) {
      return 'Pallet';
    } else if (envelopes && envelopes.length > 0) {
      return 'Envelope';
    } else if (packages && packages.length > 0) {
      return 'Package';
    }

    return null; // No parcel type selected
  };

  React.useEffect(() => {
    const fetchData = async () => {
      if (isServiceData) {
        const serviceTypes = getSelectedParcelType();
        if (serviceTypes) {
          await getAQuote.QuoteService(serviceTypes);
        }
      }
    };
    fetchData();
  }, [isServiceData]);

  const addressChangeHandler = (key: 'delivery' | 'pickup', country: countryType) => {
    if (key === 'delivery') {
      quoteSharedStore.setCountry('deliveryCountry', country!);
    } else if (key === 'pickup') {
      quoteSharedStore.setCountry('pickupCountry', country!);
    }
  };

  const modelSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    quoteDataStore.resetParcels();
    close();
  };

  const updateService = (service: any) => {
    setServiceTypes(service);
    getAQuoteDataStore.updateServiceType(service.name! as ServiceType);
  };

  const pickupAddress = quoteSharedStore.getLocations().pickup;
  const deliveryAddress = quoteSharedStore.getLocations().delivery;
  return (
    <>
      <Modal title="Update Delivery" opened={opened} onClose={close}>
        <form onSubmit={modelSubmitHandler} className="grid gap-6" action="">
          <section className="grid gap-3">
            <Text className="font-bold">Collect From</Text>
            <CountrySelect value={pickupAddress.country} onChange={(d) => addressChangeHandler('pickup', d)} />
          </section>
          <section className="grid gap-3">
            <Text className="font-bold">Delivery To</Text>
            <CountrySelect value={deliveryAddress.country} onChange={(d) => addressChangeHandler('delivery', d)} />
          </section>
          <Button type="submit">Update</Button>
        </form>
      </Modal>

      <div className="flex-1">
        <article className="grid gap-8">
          <section className="cargo-quote-section grid gap-4">
            <div className="flex justify-between gap-4">
              <Title order={3} className="font-semibold">
                Delivery
              </Title>
              <ActionIcon onClick={open} radius="lg" variant="light">
                <Icon icon="material-symbols:edit" />
              </ActionIcon>
            </div>

            <div className="grid gap-4 grid-cols-2">
              <div>
                <Text>Collect From</Text>
                <div className="with-icon mt-2">
                  <Icon className="text-xl" icon={countryFlags.Collect} />
                  <Text className="font-semibold">
                    {(PICKUP_COUNTRY?.code as string) || 'Unknown'}
                    <span className="font-light text-gray-600 mx-1">
                      ({(PICKUP_COUNTRY?.name as string) || 'Unknown'})
                    </span>
                  </Text>
                </div>
              </div>
              <div>
                <Text>Deliver To</Text>
                <div className="with-icon mt-2">
                  <Icon className="text-xl" icon={countryFlags.Deliver} />
                  <Text className="font-semibold">
                    {(DELIVERY_COUNTRY?.code as string) || 'Unknown'}
                    <span className="font-light text-gray-600 mx-1">
                      ({(DELIVERY_COUNTRY?.name as string) || 'Unknown'})
                    </span>
                  </Text>
                </div>
              </div>
            </div>
          </section>

          <article className="grid gap-4">
            {/* ENVELOPES */}
            {QUOTE_DATA.parcels.envelopes.map((item, index) => (
              <CargoInput
                key={index + item.parcelId!}
                index={index}
                {...item}
                type={'envelopes'}
                setIsServiceData={setisServiceData}
              />
            ))}
            {/* PACKAGE */}
            {QUOTE_DATA.parcels.packages.map((item, index) => (
              <CargoInput
                key={index + item.parcelId!}
                {...item}
                index={index}
                type="packages"
                setIsServiceData={setisServiceData}
              />
            ))}
            {/* PALLET */}
            {QUOTE_DATA.parcels.pallets.map((item, index) => (
              <CargoInput
                key={index + item.parcelId!}
                {...item}
                index={index}
                type="pallets"
                setIsServiceData={setisServiceData}
              />
            ))}

            <div className="grid gap-8 grid-cols-3 mt-4">
             {
              QUOTE_DATA.parcels.envelopes.length !== 0 ? (
                <Button
                radius="md"
                leftSection={<Icon className="text-lg text-blue-500" icon="rivet-icons:plus" />}
                onClick={() => quoteDataStore.addParcel('envelopes')}
                className="text-gray-800"
                variant="white"
              >
                Add Envelope
              </Button>
              ) :(
               <>
                {
                  QUOTE_DATA.parcels.packages.length === 0 && QUOTE_DATA.parcels.pallets.length === 0 && (
                    <Button
                    radius="md"
                    leftSection={
                      <Icon
                        className="text-lg text-blue-500"
                        icon="rivet-icons:plus"
                      />
                    }
                    onClick={() => quoteDataStore.addParcel("envelopes")}
                    className="text-gray-800"
                    variant="white"
                  >
                    Add Envelope
                  </Button>
                  )
                }
                <Button
                radius="md"
                leftSection={<Icon className="text-lg text-blue-500" icon="rivet-icons:plus" />}
                onClick={() => quoteDataStore.addParcel('packages')}
                className="text-gray-800"
                variant="white"
              >
                Add Package
              </Button>
              <Button
                radius="md"
                leftSection={<Icon className="text-lg text-blue-500" icon="rivet-icons:plus" />}
                onClick={() => quoteDataStore.addParcel('pallets')}
                className="text-gray-800"
                variant="white"
              >
                Add Pallet
              </Button>
              </>
              )
             }
            </div>

            {getAQuote.isLoading ? (
              <div className="cargo-quote-section">
                <div className="grid gap-4">
                  <div>
                    <Skeleton height={20} width="30%" radius="sm" />
                    <Skeleton height={16} width="50%" mt="sm" radius="sm" />
                  </div>

                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={`service-type-skeleton-${index}`}
                      height={80}
                      radius="md"
                      className="rounded-xl shadow-sm"
                    />
                  ))}
                </div>
              </div>
            ) : isServiceData &&
              OPTIONS?.serviceTypes &&
              OPTIONS.serviceTypes.length > 0 &&
              warnings?.length === 0 &&
              (QUOTE_DATA.parcels.envelopes.length !== 0 ||
                QUOTE_DATA.parcels.packages.length !== 0 ||
                QUOTE_DATA.parcels.pallets.length) !== 0 ? (
              <section className="cargo-quote-section">
                <div className="grid gap-4">
                  <div>
                    <Title order={2}>Choose Service Type</Title>
                    <Text className="text-gray-400 mt-2">Choose a service type</Text>
                  </div>
                  {OPTIONS.serviceTypes.map((service, index) => (
                    <CheckboxCard
                      key={`service-type-${index}`}
                      className="rounded-xl shadow-sm"
                      tabIndex={0}
                      onClick={() => updateService(service)}
                    >
                      <div className="flex p-6 gap-6 items-center">
                        <Checkbox.Indicator radius="lg" size="md" checked={QUOTE_DATA.serviceType === service.name!} />
                        <div className="grid flex-1">
                          <div className="flex items-center justify-between">
                            <Text className="font-bold text-lg">{snakeCaseToString(service.name!)}</Text>
                            <Text className="text-green-500">{`${((service.price?.original?.net || 0) * 1.5).toFixed(2)} ${service.price?.original?.currencyCode}`}</Text>
                          </div>
                        </div>
                      </div>
                    </CheckboxCard>
                  ))}
                </div>
              </section>
            ) : (
              <></>
            )}
          </article>
        </article>
      </div>
      <OrderSummerySection submitHandler={submitHandler} />
    </>
  );
};

export default BaseInformationSection;
