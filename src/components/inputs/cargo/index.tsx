import {
  PackageT,
  PalletT,
  UNIT_TYPE_ENUM,
  UNIT_VALUE,
  useCargoStore,
} from "@/store/cargo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ActionIcon, Button, NumberInput, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

type CargoInputT =
  | (PackageT & { type: "Package"; index: number })
  | (PalletT & { type: "Pallet"; index: number });

type CargoInputFormT = Omit<PackageT, "numberOfPackages"> & {
  noOfItems: number;
};

function validateNumber(v: unknown) {
  if (!v) return "This field is require.";
  if (typeof v !== "number") return "Invalid type.";
  if (v <= 0) return "Invalid Number";
  return null;
}

const CargoInput = (props: CargoInputT) => {
  const cargoStore = useCargoStore();
  const cargoForm = useForm<CargoInputFormT>({
    initialValues: {
      height: props.height ?? 0,
      length: props.length ?? 0,
      unit: props.unit ?? UNIT_TYPE_ENUM.Metric,
      weight: props.weight ?? 0,
      width: props.width ?? 0,
      noOfItems:
        props.type === "Package"
          ? props.numberOfPackages
          : props.numberOfPallets,
    },
    validate: {
      height: validateNumber,
      length: validateNumber,
      unit: validateNumber,
      weight: validateNumber,
      width: validateNumber,
      noOfItems: validateNumber,
    },
  });

  const changeNumberHandler = (type: "INC" | "DEC") => {
    if (type == "INC") {
      cargoForm.setValues({
        noOfItems: cargoForm.values.noOfItems + 1,
      });
    } else if (type == "DEC") {
      if (cargoForm.values.noOfItems > 1)
        cargoForm.setValues({
          noOfItems: cargoForm.values.noOfItems - 1,
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

  function watchHandler(property: string) {
    cargoForm.validate();
    if (cargoForm.isValid()) afterChange();
  }

  cargoForm.watch("height", () => watchHandler("height"));
  cargoForm.watch("length", () => watchHandler("length"));
  cargoForm.watch("unit", () => watchHandler("unit"));
  cargoForm.watch("weight", () => watchHandler("weight"));
  cargoForm.watch("width", () => watchHandler("width"));
  cargoForm.watch("noOfItems", () => watchHandler("noOfItems"));

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
                cargoForm.setValues({ unit: UNIT_TYPE_ENUM.Metric })
              }
              variant={
                cargoForm.values.unit != UNIT_TYPE_ENUM.Metric
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
                cargoForm.setValues({ unit: UNIT_TYPE_ENUM.Imperial })
              }
              variant={
                cargoForm.values.unit != UNIT_TYPE_ENUM.Imperial
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
              className="cursor-pointer absolute left-0 z-10"
              variant="transparent"
              onClick={() => changeNumberHandler("DEC")}
            >
              <Icon icon="rivet-icons:minus" />
            </ActionIcon>
            <NumberInput
              hideControls
              classNames={{ input: "text-center border-none" }}
              {...cargoForm.getInputProps("noOfItems")}
            />
            <ActionIcon
              className="cursor-pointer absolute right-0 z-10"
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
            rightSection={
              <Text className="text-gray-400 text-sm pr-2">
                {UNIT_VALUE[cargoForm.values.unit].weight}
              </Text>
            }
            {...cargoForm.getInputProps("weight")}
          />
        </div>
        <div>
          <span className="text-sm mb-2 font-semibold">Length</span>
          <NumberInput
            rightSection={
              <Text className="text-gray-400 text-sm pr-2">
                {UNIT_VALUE[cargoForm.values.unit].size}
              </Text>
            }
            {...cargoForm.getInputProps("length")}
          />
        </div>
        <div>
          <span className="text-sm mb-2 font-semibold">Width</span>
          <NumberInput
            rightSection={
              <Text className="text-gray-400 text-sm pr-2">
                {UNIT_VALUE[cargoForm.values.unit].size}
              </Text>
            }
            {...cargoForm.getInputProps("width")}
          />
        </div>
        <div>
          <span className="text-sm mb-2 font-semibold">Height</span>
          <NumberInput
            rightSection={
              <Text className="text-gray-400 text-sm pr-2">
                {UNIT_VALUE[cargoForm.values.unit].size}
              </Text>
            }
            {...cargoForm.getInputProps("height")}
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
