import {
  PackageT,
  UNIT_TYPE_ENUM,
  UNIT_VALUE,
  useCargoStore,
} from "@/store/cargo";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, NumberInput, Text, Title } from "@mantine/core";

export type CargoInputType = "Package" | "Pallet";

type commonPropTypes = {
  index: number;
  type: "Package" | "Pallet";
};

type CargoInputT = PackageT & commonPropTypes;

const CargoInput = (props: CargoInputT) => {
  const cargoStore = useCargoStore();
  const { type, index, ...cargoData } = props;

  const changeNumberHandler = (type: "INC" | "DEC") => {
    if (type == "INC") {
      upgradeCargoStore({
        ...cargoData,
        noOfItems: cargoData.noOfItems + 1,
      });
    } else if (type == "DEC") {
      if (cargoData.noOfItems > 1)
        upgradeCargoStore({
          ...cargoData,
          noOfItems: cargoData.noOfItems - 1,
        });
    }
  };

  const deleteHandler = () => {
    switch (props.type) {
      case "Package":
        cargoStore.removePackage && cargoStore.removePackage(props.index);
        break;
      case "Pallet":
        cargoStore.removePallet && cargoStore.removePallet(props.index);
        break;
    }
  };

  const numberChangeHandler = (
    field: keyof Omit<PackageT, "unit">,
    input: number | string
  ) => {
    const newState: PackageT = { ...cargoData };
    if (typeof input === "number") newState[field] = input;
    if (typeof input === "string") newState[field] = Number(input);

    upgradeCargoStore(newState);
  };

  const upgradeCargoStore = (data: PackageT) => {
    switch (props.type) {
      case "Package":
        {
          cargoStore?.editPackage && cargoStore.editPackage(props.index, data);
        }
        break;
      case "Pallet":
        {
          cargoStore?.editPallet && cargoStore.editPallet(props.index, data);
        }
        break;
    }
  };

  return (
    <section className="cargo-quote-section grid gap-4 ">
      <div className="flex justify-between">
        <Title order={3} className="font-semibold">
          {`${props.type} #${props.index + 1}`}
        </Title>
        <div className="with-icon">
          <div className="flex rounded-full bg-gray-200 p-1 gap-1">
            <Button
              radius="lg"
              size="xs"
              className="text-sm text-gray-700"
              onClick={() =>
                upgradeCargoStore({ ...cargoData, unit: UNIT_TYPE_ENUM.Metric })
              }
              variant={
                cargoData.unit != UNIT_TYPE_ENUM.Metric
                  ? "transparent"
                  : "white"
              }
            >
              {UNIT_TYPE_ENUM.Metric}
            </Button>
            <Button
              radius="lg"
              size="xs"
              className="text-sm text-gray-700"
              onClick={() =>
                upgradeCargoStore({
                  ...cargoData,
                  unit: UNIT_TYPE_ENUM.Imperial,
                })
              }
              variant={
                cargoData.unit != UNIT_TYPE_ENUM.Imperial
                  ? "transparent"
                  : "white"
              }
            >
              {UNIT_TYPE_ENUM.Imperial}
            </Button>
          </div>

          <ActionIcon
            radius="lg"
            color="gray.8"
            onClick={deleteHandler}
            variant="light"
          >
            <Icon icon="solar:trash-bin-2-linear" />
          </ActionIcon>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 justify-stretch gap-4">
        <div>
          <span className="text-sm mb-2 font-semibold">{props.type}</span>
          <div className="relative flex items-center border border-solid border-gray-200 shadow-xs rounded px-1">
            <ActionIcon
              className="cursor-pointer absolute left-0 z-10 text-gray-600"
              variant="transparent"
              onClick={() => changeNumberHandler("DEC")}
            >
              <Icon icon="rivet-icons:minus" />
            </ActionIcon>
            <NumberInput
              min={0}
              value={cargoData["noOfItems"]}
              onChange={(e) => numberChangeHandler("noOfItems", e)}
              hideControls
              className="w-full"
              classNames={{ input: "text-center border-none" }}
            />
            <ActionIcon
              className="cursor-pointer absolute right-0 z-10 text-gray-600"
              variant="transparent"
              onClick={() => changeNumberHandler("INC")}
            >
              <Icon icon="rivet-icons:plus" />
            </ActionIcon>
          </div>
        </div>
        <div>
          <span className="text-sm mb-2 font-semibold">Weight</span>
          <NumberInput
            min={0}
            defaultValue={cargoData["weight"]}
            onChange={(e) => numberChangeHandler("weight", e)}
            rightSection={
              <Text className="text-gray-400 text-sm pr-2">
                {UNIT_VALUE[cargoData.unit].weight}
              </Text>
            }
          />
        </div>
        <div>
          <span className="text-sm mb-2 font-semibold">Length</span>
          <NumberInput
            min={0}
            defaultValue={cargoData["length"]}
            onChange={(e) => numberChangeHandler("length", e)}
            rightSection={
              <Text className="text-gray-400 text-sm pr-2">
                {UNIT_VALUE[cargoData.unit].size}
              </Text>
            }
          />
        </div>
        <div>
          <span className="text-sm mb-2 font-semibold">Width</span>
          <NumberInput
            min={0}
            defaultValue={cargoData["width"]}
            onChange={(e) => numberChangeHandler("width", e)}
            rightSection={
              <Text className="text-gray-400 text-sm pr-2">
                {UNIT_VALUE[cargoData.unit].size}
              </Text>
            }
          />
        </div>
        <div>
          <span className="text-sm mb-2 font-semibold">Height</span>
          <NumberInput
            min={0}
            defaultValue={cargoData["height"]}
            onChange={(e) => numberChangeHandler("height", e)}
            rightSection={
              <Text className="text-gray-400 text-sm pr-2">
                {UNIT_VALUE[cargoData.unit].size}
              </Text>
            }
          />
        </div>
      </div>
      <Text className="text-gray-600">
        Please make sure weight and dimensions are accurate to avoid later
        surcharges
      </Text>
    </section>
  );
};

export default CargoInput;
