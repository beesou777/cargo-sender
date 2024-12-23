import { useState, useEffect } from 'react';
import { Table, ScrollArea, Text, Pagination } from '@mantine/core';
import { useRouter } from 'next/navigation';
import SkeletanTable from '@/components/skeletan/table';

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
      pickupDate: string | null;
    };
    status: string;
  };
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((value, key) => value?.[key], obj);
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.keys(item).some((key) => {
      const value = getNestedValue(item, key);
      return typeof value === 'string' && value.toLowerCase().includes(query);
    }),
  );
}

function sortData(data: RowData[], payload: { sortBy: string | null; reversed: boolean; search: string }) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortBy)?.toString() || '';
      const bValue = getNestedValue(b, sortBy)?.toString() || '';

      if (payload.reversed) {
        return bValue.localeCompare(aValue);
      }

      return aValue.localeCompare(bValue);
    }),
    payload.search,
  );
}

export default function OrderListTable({ data, loading }: { data: RowData[]; loading: boolean }) {
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const router = useRouter();

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setSortedData(data);
    }
  }, [data]);

  const setSorting = (field: string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search: '' }));
  };

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const rows = paginatedData.map((row) => (
    <Table.Tr key={row.order_code} onClick={() => router.push(`orders/${row.order_code}`)} className="cursor-pointer ">
      <Table.Td>{row.order_code}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.created_at.split('T')[0]}</Table.Td>
      <Table.Td>{row.payment.amount}</Table.Td>
      <Table.Td>{row.euroSenderOrder.shipment.pickupDate.split('T')[0]}</Table.Td>
      <Table.Td>{row.euroSenderOrder.price.original.gross}</Table.Td>
      <Table.Td>{row.euroSenderOrder.status}</Table.Td>
    </Table.Tr>
  ));

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="mt-4">
      <ScrollArea>
        <Table.ScrollContainer minWidth={1024}>
          <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="xs" miw={1024} withRowBorders={false}>
            <Table.Tbody>
              <Table.Tr>
                <Table.Th className="cursor-pointer" onClick={() => setSorting('order_code')}>
                  Order Code {sortBy === 'order_code' && (reverseSortDirection ? ' ↓' : ' ↑')}
                </Table.Th>
                <Table.Th className="cursor-pointer" onClick={() => setSorting('name')}>
                  Name {sortBy === 'name' && (reverseSortDirection ? ' ↓' : ' ↑')}
                </Table.Th>
                <Table.Th className="cursor-pointer" onClick={() => setSorting('created_at')}>
                  Created At {sortBy === 'created_at' && (reverseSortDirection ? ' ↓' : ' ↑')}
                </Table.Th>
                <Table.Th className="cursor-pointer" onClick={() => setSorting('payment.amount')}>
                  Amount {sortBy === 'payment.amount' && (reverseSortDirection ? ' ↓' : ' ↑')}
                </Table.Th>
                <Table.Th className="cursor-pointer" onClick={() => setSorting('euroSenderOrder.shipment.pickupDate')}>
                  Pickup Date {sortBy === 'euroSenderOrder.shipment.pickupDate' && (reverseSortDirection ? ' ↓' : ' ↑')}
                </Table.Th>
                <Table.Th className="cursor-pointer" onClick={() => setSorting('euroSenderOrder.price.original.gross')}>
                  Price {sortBy === 'euroSenderOrder.price.original.gross' && (reverseSortDirection ? ' ↓' : ' ↑')}
                </Table.Th>
                <Table.Th className="cursor-pointer" onClick={() => setSorting('euroSenderOrder.status')}>
                  Status {sortBy === 'euroSenderOrder.status' && (reverseSortDirection ? ' ↓' : ' ↑')}
                </Table.Th>
              </Table.Tr>
            </Table.Tbody>

            {loading ? (
              <SkeletanTable count={10} rows={7} />
            ) : (
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={7}>
                      <Text fw={500} ta="center">
                        Nothing found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            )}
          </Table>
        </Table.ScrollContainer>
      </ScrollArea>

      <Pagination onChange={setCurrentPage} total={totalPages} mt="md" />
    </div>
  );
}
