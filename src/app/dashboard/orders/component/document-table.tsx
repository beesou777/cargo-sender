import { useState } from 'react';
import {
  Table,
  ScrollArea,
  Text,
  keys,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
interface RowData {
  title: string;
  orderNumber: string;
  invoiceIssueDate: string;
  type: string;
  document: string;
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

export default function DocumentTable({ data }: { data: any[] }) {
  const [sortedData, setSortedData] = useState<RowData[]>(data);
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
      <Table.Td>{row.title}</Table.Td>
      <Table.Td>
        {row.orderNumber}
      </Table.Td>
      <Table.Td>{row.invoiceIssueDate}</Table.Td>
      <Table.Td>{row.type}</Table.Td>
      <Table.Td>{row.document}</Table.Td>
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