import { Icon } from '@iconify/react';
import { ActionIcon, Button, NumberInput, Text, Title } from '@mantine/core';
import { parcelPayload, parcelTypeEnum, useGetAQuoteDataStore } from '@/store/quote/quote';
import { useQuoteSharedStore } from '@/store/quote/quoteSharedStore';
import { useEffect } from 'react';
export type CargoInputType = 'Package' | 'Pallet';
type CargoInputT = parcelPayload & commonPropTypes;
type commonPropTypes = {
  index: number;
  type: parcelTypeEnum;
  setIsServiceData: React.Dispatch<React.SetStateAction<boolean>>;
};

const CargoInput = (props: CargoInputT) => {
  const cargoStore = useGetAQuoteDataStore();
  const { unit: UNIT } = useQuoteSharedStore();
  const { index: PARCEL_INDEX, type: PARCEL_TYPE, setIsServiceData, ...PAYLOAD_DATA } = props;

  const upgradeCargoStore = (data: parcelPayload) => {
    cargoStore.updateParcel(PARCEL_TYPE, PARCEL_INDEX, data);
  };

  const changeNumberHandler = (type: 'INC' | 'DEC') => {
    if (type == 'INC')
      upgradeCargoStore({
        ...PAYLOAD_DATA,
        quantity: PAYLOAD_DATA.quantity + 1,
      });
    else if (type == 'DEC')
      if (PAYLOAD_DATA.quantity > 1)
        upgradeCargoStore({
          ...PAYLOAD_DATA,
          quantity: PAYLOAD_DATA.quantity - 1,
        });
  };

  const deleteHandler = () => {
    setIsServiceData(false);
    cargoStore.removeParcel(PARCEL_TYPE, PARCEL_INDEX);
  };
  // Debouncer utility
  const createDebouncer = (callback: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = null; // Reset timeoutId after execution
        callback(...args);
      }, delay);
    };
  };

  const requiredFields: (keyof Omit<parcelPayload, 'parcelId'>)[] = [
    'height',
    'length',
    'quantity',
    'value',
    'weight',
    'width',
  ];

  const debouncedHandler = createDebouncer((updatedPayload: typeof PAYLOAD_DATA) => {
    // Check if all required fields are filled
    const allFilled = requiredFields.every((field) => !!updatedPayload[field]);
    if (allFilled) {
      setIsServiceData(true);
    } else if (PARCEL_TYPE == 'envelopes' && updatedPayload.quantity > 0 && (updatedPayload.weight ?? 0) > 0) {
      setIsServiceData(true);
    } else {
      setIsServiceData(false);
    }
  }, 2000);

  const numberChangeHandler = (field: keyof Omit<parcelPayload, 'parcelId'>, input: number | string) => {
    const newState = { ...PAYLOAD_DATA };
    if (typeof input === 'number') newState[field] = Math.ceil(input);
    if (typeof input === 'string') newState[field] = Math.ceil(Number(input));
    setIsServiceData(false);
    debouncedHandler(newState);

    upgradeCargoStore(newState);
  };

  useEffect(() => {
    const allFieldsFilled = requiredFields.every((field) => !!PAYLOAD_DATA[field]);
    if (allFieldsFilled) {
      setIsServiceData(true);
    } else if (PARCEL_TYPE == 'envelopes' && PAYLOAD_DATA.quantity > 0 && (PAYLOAD_DATA.weight ?? 0) > 0) {
      setIsServiceData(true);
    } else {
      setIsServiceData(false);
    }
  }, []);

  return (
    <section className="cargo-quote-section grid gap-4 ">
      <div className="flex justify-between">
        <Title order={3} className="font-semibold">
          {`${PARCEL_TYPE} #${PARCEL_INDEX + 1}`}
        </Title>
        <div className="with-icon">
          <ActionIcon radius="lg" color="gray.8" onClick={deleteHandler} variant="light">
            <Icon icon="solar:trash-bin-2-linear" />
          </ActionIcon>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 justify-stretch gap-4">
        <div>
          <span className="text-sm mb-2 font-semibold">
            Quantity
            <span className="text-red-500">*</span>
          </span>
          <div className="relative flex items-center border border-solid border-gray-200 shadow-xs rounded px-1">
            <ActionIcon
              className="cursor-pointer absolute left-0 z-10 text-gray-600"
              variant="transparent"
              onClick={() => changeNumberHandler('DEC')}
            >
              <Icon icon="rivet-icons:minus" />
            </ActionIcon>
            <NumberInput
              min={1}
              value={PAYLOAD_DATA['quantity']}
              onChange={(e) => numberChangeHandler('quantity', e)}
              hideControls
              className="w-full"
              classNames={{ input: 'text-center border-none !placeholder-gray-400' }}
            />
            <ActionIcon
              className="cursor-pointer absolute right-0 z-10 text-gray-600"
              variant="transparent"
              onClick={() => changeNumberHandler('INC')}
            >
              <Icon icon="rivet-icons:plus" />
            </ActionIcon>
          </div>
        </div>
        <div>
          <span className="text-sm mb-2 font-semibold">
            Weight
            <span className="text-red-500">*</span>
          </span>
          <NumberInput
            required
            min={0}
            max={PARCEL_TYPE !== 'envelopes' ? 10000 : 2}
            placeholder={'1.2'}
            defaultValue={PAYLOAD_DATA['weight']}
            onChange={(e) => numberChangeHandler('weight', e)}
            rightSection={<Text className="text-gray-400 text-sm pr-2">{UNIT.weight}</Text>}
            classNames={{
              input: '!placeholder-gray-400',
            }}
          />
        </div>
        {PARCEL_TYPE !== 'envelopes' && (
          <>
            <div>
              <span className="text-sm mb-2 font-semibold">
                Length
                <span className="text-red-500">*</span>
              </span>
              <NumberInput
                min={15}
                placeholder="20"
                defaultValue={PAYLOAD_DATA['length']}
                onChange={(e) => numberChangeHandler('length', e)}
                rightSection={<Text className="text-gray-400 text-sm pr-2">{UNIT.length}</Text>}
                classNames={{
                  input: '!placeholder-gray-400',
                }}
              />
            </div>
            <div>
              <span className="text-sm mb-2 font-semibold">
                Width
                <span className="text-red-500">*</span>
              </span>
              <NumberInput
                min={11}
                placeholder="10"
                defaultValue={PAYLOAD_DATA['width']}
                onChange={(e) => numberChangeHandler('width', e)}
                rightSection={<Text className="text-gray-400 text-sm pr-2">{UNIT.length}</Text>}
                classNames={{
                  input: '!placeholder-gray-400',
                }}
              />
            </div>
            <div>
              <span className="text-sm mb-2 font-semibold">
                Height
                <span className="text-red-500">*</span>
              </span>
              <NumberInput
                min={1}
                placeholder="2"
                defaultValue={PAYLOAD_DATA['height']}
                onChange={(e) => numberChangeHandler('height', e)}
                rightSection={<Text className="text-gray-400 text-sm pr-2">{UNIT.length}</Text>}
                classNames={{
                  input: '!placeholder-gray-400',
                }}
              />
            </div>
            <div>
              <span className="text-sm mb-2 font-semibold">
                Value
                <span className="text-red-500">*</span>
              </span>
              <NumberInput
                min={0}
                className="min-w-[190px]"
                placeholder="Est. value of your item"
                defaultValue={PAYLOAD_DATA['value']}
                onChange={(e) => numberChangeHandler('value', e)}
                rightSection={<Text className="text-gray-400 text-sm pr-2">{UNIT.currency}</Text>}
                classNames={{
                  input: '!placeholder-gray-400',
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className="grid gap-1 text-sm text-gray-600">
        {PARCEL_TYPE === 'envelopes' ? (
          <div>{/* Weight exceeds max allowed value (2kg) */}</div>
        ) : (
          <>
            <div>Minimum required dimensions are 15 cm x 11 cm x 1 cm and weight 1 kg</div>
            {/* <div>Maximum required dimensions are 1000 cm x 1000 cm x 1000 cm and weight 10000 kg</div> */}
          </>
        )}
      </div>
    </section>
  );
};

export default CargoInput;
