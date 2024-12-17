import SkeletanTable from "@/components/skeletan/table";
import { Table, Anchor, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

interface RowData {
  name: string;
  order_code: string;
  created_at: string;
  payment: {
    amount: number;
  };
  euroSenderOrder: {
    price: {
      original: {
        gross: number;
      };
    };
    shipment: {
      pickupDate: string;
    };
    status: string;
  };
}

export default function RecentOrders({
  data,
  loading,
}: {
  data: RowData[];
  loading: boolean;
}) {
  const router = useRouter();

  const rows = data.slice(0, 4).map((order: RowData) => (
    <Table.Tr
      onClick={() => router.push(`/dashboard/orders/${order.order_code}`)}
      className="cursor-pointer text-[12px]"
      key={order.order_code}
    >
      <Table.Th className="p-[7px_10px_7px_15px]">
        <Anchor component="button" fz="sm">
          {order.order_code}
        </Anchor>
      </Table.Th>
      <Table.Th className="p-[7px_10px_7px_15px]">{order.name}</Table.Th>
      <Table.Th className="p-[7px_10px_7px_15px]">{order.created_at}</Table.Th>
      <Table.Th className="p-[7px_10px_7px_15px]">
        €{order.payment.amount.toFixed(2)}
      </Table.Th>
      <Table.Th className="p-[7px_10px_7px_15px]">
        <div className="bg-green-100 text- rounded-md p-1">
          {order.euroSenderOrder.status}
        </div>
      </Table.Th>
    </Table.Tr>
  ));

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        <Text size="sm" mb="md">
          Recent Orders
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
        <Table
          striped
          highlightOnHover
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
          withRowBorders={false}
        >
          {loading ? (
            <SkeletanTable count={4} rows={5} />
          ) : (
            <Table.Tbody>{rows}</Table.Tbody>
          )}
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
