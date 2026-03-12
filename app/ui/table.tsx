"use client"

import { getQuoteLink } from "@/app/actions";

type TableProps = {
  columns: string[];
  rows: Record<string, any>[];
};

export default function Table({ columns, rows }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm text-left">
        <thead>
          <tr className="bg-gray-300 border-b">
            {(columns.includes("path") !== undefined) ? <th className="px-4 py-2 font-semibold text-gray-700">
              Link
            </th> : <></>}
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 font-semibold text-gray-700"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b even:bg-gray-50 hover:bg-gray-100"
            >
            {(row["path"] !== undefined) ? <td key={-1} className="px-4 py-2 text-gray-800">
                    <button className="text-blue-700 hover:text-black" onClick={ async () => {
                      const link = await getQuoteLink(row["path"]);
                      window.open(link, "_newtab")
                    }}>
                      Go to
                    </button>
                </td> : <></>} 
              {columns.map((col) => {
                if (col === "link") return (
                    <td key={col} className="px-4 py-2 text-gray-800">
                        <a href={row[col]} className="text-blue-700 hover:text-black">
                            Go to quote
                        </a>
                    </td>
                );
                if (col === "view") return (
                    <td key={col} className="px-4 py-2 text-gray-800">
                        <button onClick={row[col]}>
                            View quote
                        </button>
                    </td>
                );
                return (
                <td key={col} className="px-4 py-2 text-gray-800">
                  {row[col]}
                </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}