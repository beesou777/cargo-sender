import { UNIT_VALUE, useCargo } from "@/store/cargo";
import { Button, Divider, Text, Title } from "@mantine/core";

const OrderSummerySection = () => {
  const { cargo } = useCargo();
  const { collectFrom, deliveryTo, packages, pallets } = cargo;
  return (
    <aside className="bg-white p-6 w-full rounded-xl flex flex-col justify-between md:max-w-[350px] md:min-h-[80svh]">
      <div className="grid gap-4">
        <Title order={4}>Order Summery</Title>
        {/* Location */}
        <section className="flex flex-col gap-2">
          <Text className="text-gray-400">PICKUP</Text>
          <div>
            <Text className="font-bold">{collectFrom?.country}</Text>
            <Text className="text-gray-400">
              {collectFrom?.geoDetail.location} -
              {collectFrom?.geoDetail.postalCode}
            </Text>
          </div>
          <div>
            <Text className="font-bold">{deliveryTo?.country}</Text>
            <Text className="text-gray-400">
              {deliveryTo?.geoDetail.location} -
              {deliveryTo?.geoDetail.postalCode}
            </Text>
          </div>
        </section>
        <Divider />
        {/* Shipping Info */}
        <section className="flex flex-col gap-2">
          <Text className="text-gray-400">SHIPPING OPTIONS</Text>
          <div className="flex gap-4 justify-between">
            <Text className="">{packages[0].length}x Package</Text>
            <Text className="text-gray-400">
              {`${packages[0].weight} ${UNIT_VALUE[packages[0].unit].weight}`}
            </Text>
          </div>
        </section>
        <Divider />
        {/* Cost Summery Info */}
        <section className="flex gap-4 justify-between">
          <div className="flex flex-col gap-1 items-start">
            <Text className="font-bold">Total</Text>
            <Text className="text-sm text-gray-400">incl. VAT</Text>
          </div>
          <Text className="font-bold text-blue-500">€35</Text>
        </section>
      </div>
      <Button>Continue</Button>
    </aside>
  );
};

export default OrderSummerySection;
