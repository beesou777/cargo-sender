import { useState } from 'react';
import {
  Table,
  ScrollArea,
  Text,
  keys,
} from '@mantine/core';
import { useRouter } from 'next/navigation';

interface RowData {
  name: string;
  orderNumber: string;
  date: string;
  amount: number;
  pickupDate: string;
  totalPrice: number;
  status: string;
}


function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    (Object.keys(data[0]) as Array<keyof RowData>).some((key) => {
      const value = item[key];
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(query)
      );
    })
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aValue = (a[sortBy] as string | number).toString();
      const bValue = (b[sortBy] as string | number).toString();

      if (payload.reversed) {
        return bValue.localeCompare(aValue);
      }

      return aValue.localeCompare(bValue);
    }),
    payload.search
  );
}


const data = [
  {
    orderNumber: 'ORD001',
    name: 'Athena Weissnat',
    date: '2024-11-01',
    amount: 150,
    pickupDate: '2024-11-05',
    totalPrice: 180,
    status: 'Pending',
  },
  {
    orderNumber: 'ORD002',
    name: 'Deangelo Runolfsson',
    date: '2024-11-02',
    amount: 200,
    pickupDate: '2024-11-06',
    totalPrice: 240,
    status: 'Shipped',
  },
  {
    orderNumber: 'ORD003',
    name: 'Danny Carter',
    date: '2024-11-03',
    amount: 300,
    pickupDate: '2024-11-07',
    totalPrice: 350,
    status: 'Delivered',
  },
  {
    orderNumber: 'ORD004',
    name: 'Trace Tremblay',
    date: '2024-11-04',
    amount: 450,
    pickupDate: '2024-11-08',
    totalPrice: 500,
    status: 'Pending',
  },
  {
    orderNumber: 'ORD005',
    name: 'Derek Dibbert',
    date: '2024-11-05',
    amount: 120,
    pickupDate: '2024-11-09',
    totalPrice: 150,
    status: 'Shipped',
  },
  {
    orderNumber: 'ORD006',
    name: 'Viola Bernhard',
    date: '2024-11-06',
    amount: 250,
    pickupDate: '2024-11-10',
    totalPrice: 280,
    status: 'Pending',
  },
  {
    orderNumber: 'ORD007',
    name: 'Austin Jacobi',
    date: '2024-11-07',
    amount: 400,
    pickupDate: '2024-11-11',
    totalPrice: 450,
    status: 'Delivered',
  },
  {
    orderNumber: 'ORD008',
    name: 'Hershel Mosciski',
    date: '2024-11-08',
    amount: 350,
    pickupDate: '2024-11-12',
    totalPrice: 400,
    status: 'Shipped',
  },
  {
    orderNumber: 'ORD009',
    name: 'Mylene Ebert',
    date: '2024-11-09',
    amount: 180,
    pickupDate: '2024-11-13',
    totalPrice: 210,
    status: 'Pending',
  },
  {
    orderNumber: 'ORD010',
    name: 'Lou Trantow',
    date: '2024-11-10',
    amount: 220,
    pickupDate: '2024-11-14',
    totalPrice: 260,
    status: 'Delivered',
  },
];



export default function OrderListTable() {
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const router = useRouter()

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search: "" }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.orderNumber} onClick={() => router.push("/dashboard")} className='cursor-pointer bg-gray-50 hover:bg-gray-100 duration-300 [border-bottom:10px_solid_white] [border-top:10px_solid_white]'>
      <Table.Td>{row.orderNumber}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.amount}</Table.Td>
      <Table.Td>{row.pickupDate}</Table.Td>
      <Table.Td>{row.totalPrice}</Table.Td>
      <Table.Td>{row.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            {
              Object.keys(data[0]).map((key) => (
                <Table.Th
                  key={key}
                  onClick={() => setSorting(key as keyof RowData)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: sortBy === key ? 'bold' : 'normal', 
                    transform: sortBy === key && reverseSortDirection ? 'rotate(180deg)' : 'none',
                  }}
                >
                  {key}
                </Table.Th>
              ))
            }
          </Table.Tr>
        </Table.Tbody>

        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}