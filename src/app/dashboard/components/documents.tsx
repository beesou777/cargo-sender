"use client";
import { Text, Table, Anchor } from "@mantine/core";

import { useRouter } from "next/navigation";

const orders = [
  {
    id: "826706-24",
    name: "Salik ram subedi",
    date: "2024-10-31",
    amount: 47.48,
    status: "Tracking",
  },
  {
    id: "655238-24",
    name: "Bibek Sharma",
    date: "2024-10-30",
    amount: 23.95,
    status: "Tracking",
  },
  {
    id: "865295-24",
    name: "Prakash bhandari",
    date: "2024-10-25",
    amount: 71.85,
    status: "Tracking",
  },
];
export default function Documents() {
  const router = useRouter();
  const rows = orders.map((order) => (
    <tr
      className="rounded-s bg-gray-50 text-[12px] duration-300 [border-bottom:8px_solid_white] [border-top:8px_solid_white] hover:bg-gray-100"
      key={order.id}
    >
      <td className="p-[7px_10px_7px_15px]">
        <Anchor component="button" fz="sm">
          {order.id}
        </Anchor>
      </td>
      <td className="p-[7px_10px_7px_15px]">{order.name}</td>
      <td className="p-[7px_10px_7px_15px]">
        <div className="text- rounded-md bg-green-100 p-1">{order.status}</div>
      </td>
    </tr>
  ));

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <Text size="sm" mb="md">
          Recent Documents
        </Text>
        <Anchor
          component="button"
          onClick={() => router.push("/dashboard/orders")}
          className="text-[12px]"
        >
          View All
        </Anchor>
      </div>
      <Table.ScrollContainer minWidth={1024}>
        <Table highlightOnHover>
          <tbody>
            {rows ? (
              <tr className="rounded-s bg-gray-50 text-[12px] duration-300 [border-bottom:8px_solid_white] [border-top:8px_solid_white] hover:bg-gray-100">
                <td className="p-[7px_10px_7px_15px]">No Data found</td>
                <td className="p-[7px_10px_7px_15px]"></td>
                <td className="p-[7px_10px_7px_15px]">
                  <div className="text- rounded-md bg-green-100 p-1"></div>
                </td>
              </tr>
            ) : (
              rows
            )}
          </tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
