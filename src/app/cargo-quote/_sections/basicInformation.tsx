import CargoInput from "@/components/inputs/packages";
import { useCargoStore } from "@/store/cargo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Title } from "@mantine/core";
import OrderSummerySection from "./orderSummery";

const BaseInformationSection = () => {
  const cargoStore = useCargoStore();
  return (
    <>
      <div className="flex-1">
        <article className="grid gap-8">
          <section className="cargo-quote-section grid gap-4 ">
            <Title order={3}>Delivery</Title>
            <div className="grid gap-2"></div>
          </section>
          <div className="grid gap-4">
            <CargoInput {...cargoStore.cargo.packages[0]} type="Package" />
            <div className="grid gap-4 grid-cols-2">
              <Button
                leftSection={
                  <Icon
                    className="text-xl text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                className="text-gray-800"
                size="lg"
                variant="white"
              >
                Add Package
              </Button>
              <Button
                leftSection={
                  <Icon
                    className="text-xl text-blue-500"
                    icon="rivet-icons:plus"
                  />
                }
                className="text-gray-800"
                size="lg"
                variant="white"
              >
                Add Pallet
              </Button>
            </div>
          </div>
          <section className="cargo-quote-section grid gap-4 ">
            <div className="grid gap-2">
              <Title order={3} className="font-semibold">
                Choose Shipping Options
              </Title>
            </div>
          </section>
        </article>
      </div>
      <OrderSummerySection />
    </>
  );
};

export default BaseInformationSection;
