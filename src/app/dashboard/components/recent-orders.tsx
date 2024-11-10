import { Table, Anchor, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

// Define the RowData interface with the correct structure for the orders
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

// Your RecentOrders component with correct prop types
export default function RecentOrders({ data }: { data: RowData[] }) {
  const router = useRouter();

  // Map through data.orders and create table rows
  const rows = data.slice(0, 4).map((order: RowData) => (
    <tr
      className="bg-gray-50 hover:bg-gray-100 duration-300 [border-bottom:8px_solid_white] [border-top:8px_solid_white] rounded-s text-[12px]"
      key={order.order_code}
    >
      <td className="p-[7px_10px_7px_15px]">
        <Anchor component="button" fz="sm">
          {order.order_code}
        </Anchor>
      </td>
      <td className="p-[7px_10px_7px_15px]">{order.name}</td>
      <td className="p-[7px_10px_7px_15px]">{order.created_at}</td>
      <td className="p-[7px_10px_7px_15px]">€{order.payment.amount.toFixed(2)}</td>
      <td className="p-[7px_10px_7px_15px]">
        <div className="bg-green-100 text- rounded-md p-1">{order.euroSenderOrder.status}</div>
      </td>
    </tr>
  ));

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        <Text size="sm" mb="md">
          Recent Orders
        </Text>
        <Anchor component="button" onClick={() => router.push('/dashboard/orders')} className="text-[12px]">
          View All
        </Anchor>
      </div>
      <Table highlightOnHover>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
