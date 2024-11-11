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
        gross: number
      }
    }
    shipment: {
      pickupDate: string;
    };
    status: string;
  };
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    (Object.keys(item) as Array<keyof RowData>).some((key) => {
      const value = item[key];
      return typeof value === 'string' && value.toLowerCase().includes(query);
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

export default function OrderListTable({ data, loading }: { data: any[], loading: boolean }) {
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  // const [search, setSearch] = useState(""); // Search state
  console.log(loading)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const router = useRouter();

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setSortedData(data);
    }
  }, [data]);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search: '' }));
  };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  //   setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: e.target.value }));
  // };

  // Calculate the rows for the current page
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const rows = paginatedData.map((row) => (
    <Table.Tr
      key={row.order_code}
      onClick={() => router.push(`orders/${row.order_code}`)}
      className="cursor-pointer bg-gray-50 hover:bg-gray-100 duration-300 [border-bottom:10px_solid_white] [border-top:10px_solid_white]"
    >
      <Table.Td>{row.order_code}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.created_at}</Table.Td>
      <Table.Td>{row.payment.amount}</Table.Td>
      <Table.Td>{row.euroSenderOrder.shipment.pickupDate}</Table.Td>
      <Table.Td>{row.euroSenderOrder.price?.original?.gross}</Table.Td>
      <Table.Td>{row.euroSenderOrder.status}</Table.Td>
    </Table.Tr>
  ));

  const totalPages = Math.ceil(sortedData.length / itemsPerPage); // Calculate total pages

  return (
    <div>
      {/* <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
        style={{ marginBottom: '10px', padding: '8px' }}
      /> */}

      <ScrollArea>
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
          <Table.Tbody>
            <Table.Tr>
              <Table.Th
                sorted={sortBy === 'order_code' ? (reverseSortDirection ? 'desc' : 'asc') : null}
                onSort={() => setSorting('order_code')}
              >
                Order Code
              </Table.Th>
              <Table.Th
                sorted={sortBy === 'name' ? (reverseSortDirection ? 'desc' : 'asc') : null}
                onSort={() => setSorting('name')}
              >
                Name
              </Table.Th>
              <Table.Th
                sorted={sortBy === 'created_at' ? (reverseSortDirection ? 'desc' : 'asc') : null}
                onSort={() => setSorting('created_at')}
              >
                Created At
              </Table.Th>
              <Table.Th
                sorted={sortBy === 'amount' ? (reverseSortDirection ? 'desc' : 'asc') : null}
                onSort={() => setSorting('amount')}
              >
                Amount
              </Table.Th>
              <Table.Th
                sorted={sortBy === 'pickupDate' ? (reverseSortDirection ? 'desc' : 'asc') : null}
                onSort={() => setSorting('pickupDate')}
              >
                Pickup Date
              </Table.Th>
              <Table.Th
                sorted={sortBy === 'totalPrice' ? (reverseSortDirection ? 'desc' : 'asc') : null}
                onSort={() => setSorting('totalPrice')}
              >
                Total Price
              </Table.Th>
              <Table.Th
                sorted={sortBy === 'status' ? (reverseSortDirection ? 'desc' : 'asc') : null}
                onSort={() => setSorting('status')}
              >
                Status
              </Table.Th>
            </Table.Tr>
          </Table.Tbody>

          {
            loading ? (
              <SkeletanTable count={10} rows={7} />
            ) : (
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={data.length > 0 ? Object.keys(data[0]).length : 1}>
                      <Text fw={500} ta="center">
                        Nothing found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            )
          }

        </Table>
      </ScrollArea>

      <Pagination
        page={currentPage}
        onChange={setCurrentPage}
        total={totalPages}
        position="center"
        mt="md"
      />
    </div>
  );
}
