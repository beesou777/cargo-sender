import { PackageT, PalletT, UNIT_TYPE_ENUM, UNIT_VALUE } from "@/store/cargo";
import { Button, Input, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

type CargoInputT =
  | (PackageT & { type: "Package" })
  | (PalletT & { type: "Pallet" });

type CargoInputFormT = Partial<PackageT> | Partial<PalletT>;

const CargoInput = (props: CargoInputT) => {
  const cargoForm = useForm<CargoInputFormT>({
    initialValues: {
      height: props.height ?? 0,
      length: props.length ?? 0,
      unit: props.unit ?? UNIT_TYPE_ENUM.Metric,
      weight: props.weight ?? 0,
      width: props.width ?? 0,
      numberOfPackages:
        props.type === "Package"
          ? props.numberOfPackages
          : props.numberOfPallets,
    },
  });

  return (
    <section className="cargo-quote-section grid gap-4 ">
      <div className="flex justify-between">
        <Title order={3}>{props.type}</Title>
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
        </div>
      </div>
      <div className="grid sm:flex gap-4">
        <label>
          <span className="text-sm mb-2 font-semibold">{props.type}</span>
          <Input
            type="number"
            leftSection={
              <Button
                className="cursor-pointer"
                size="xs"
                variant="transparent"
              >
                -
              </Button>
            }
            size="lg"
            rightSection={
              <Button
                className="cursor-pointer"
                size="xs"
                variant="transparent"
              >
                +
              </Button>
            }
            {...cargoForm.getInputProps("numberOfPackages")}
          />
        </label>
        <label>
          <span className="text-sm mb-2 font-semibold">Weight</span>
          <Input
            type="number"
            size="lg"
            rightSection={
              <Text className="text-gray-400 rounded-e-lg">
                {UNIT_VALUE[props.unit].weight}
              </Text>
            }
            {...cargoForm.getInputProps("weight")}
          />
        </label>
        <label>
          <span className="text-sm mb-2 font-semibold">Length</span>
          <Input
            type="number"
            size="lg"
            rightSection={
              <Text className="text-gray-400 rounded-e-lg">
                {UNIT_VALUE[props.unit].size}
              </Text>
            }
            {...cargoForm.getInputProps("length")}
          />
        </label>
        <label>
          <span className="text-sm mb-2 font-semibold">Weight</span>
          <Input
            type="number"
            size="lg"
            rightSection={
              <Text className="text-gray-400 rounded-e-lg">
                {UNIT_VALUE[props.unit].size}
              </Text>
            }
            {...cargoForm.getInputProps("weight")}
          />
        </label>
        <label>
          <span className="text-sm mb-2 font-semibold">Height</span>
          <Input
            type="number"
            size="lg"
            rightSection={
              <Text className="text-gray-400 rounded-e-lg">
                {UNIT_VALUE[props.unit].size}
              </Text>
            }
            {...cargoForm.getInputProps("height")}
          />
        </label>
      </div>
      <Text className="text-gray-600">
        Please make sure weight and dimensions are accurate to avoid later
        surcharges
      </Text>
    </section>
  );
};

export default CargoInput;
