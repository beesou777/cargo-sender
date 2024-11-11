"use client";
import { Skeleton } from "@mantine/core";

export default function SkeletanTable({count,rows}: {count: number, rows: number}) {
    const skeletanRows = [...Array(count)].map((_, index) => (
        <tr
          className="bg-gray-50 hover:bg-gray-100 duration-300 [border-bottom:8px_solid_white] [border-top:8px_solid_white] rounded-s text-[12px]"
          key={index}
        >
          {
            [...Array(rows)].map((_, index) => (
              <td className="p-[7px_10px_7px_15px]" key={index}>
                <Skeleton height={20} width={100} />
              </td>
            ))
          }
        </tr>
      ));
    return (
        <tbody>{skeletanRows}</tbody>
    );
}