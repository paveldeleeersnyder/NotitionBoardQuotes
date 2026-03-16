"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react';
import { getQuoteLink } from "@/app/actions";

type TableProps = {
  columns: string[];
  rows: Record<string, any>[];
};

function truncate(text: string) {
  text = "" + text;
  if (text.length > 100) text = text.substring(0, 98) + "...";
  return text;
}

function selectRow(e: any) {
  const $row = e.currentTarget;
  $row!.classList.toggle("selected");
}

export default function Table({ columns, rows }: TableProps) {
  let [changes, setChanges] = useState(structuredClone(rows));

  useEffect(() => {
    const inStorage = localStorage.getItem(window.location.href);
    if (inStorage !== null) changes = JSON.parse(inStorage);
    rows.forEach(r => {
      if (!(changes.find(x => r.id === x.id))) {
        changes.push(r);
      }
    });
    setChanges(structuredClone(changes));
  }, [rows]);

  const saveChanges = () => {
    localStorage.setItem(window.location.href, JSON.stringify(changes))
    setChanges(structuredClone(changes));
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">

        <table className="w-full text-sm text-left">
          
          {/* HEADER */}
          <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              {columns.includes("path") &&
                <th className="px-5 py-3 font-semibold">
                  Link
                </th>
              }

              {columns.map((col) => (
                <th
                  key={col}
                  className="px-5 py-3 font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, i) => {
              const changesForRow = changes.find(x => x.id === row.id)!;
              return (
              <tr
                key={i}
                onClick={selectRow}
                className="group transition-colors hover:bg-gray-50 selected:bg-blue-50 cursor-pointer  even:bg-(--secondary)/3"
              >

                {/* QUOTE LINK */}
                {(row["path"] !== undefined) &&
                  <td className="px-5 py-4 text-gray-700">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium transition"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const link = await getQuoteLink(row["path"]);
                        window.open(link, "_newtab")
                      }}>
                      See quote
                    </button>
                  </td>
                }

                {columns.map((col) => {
                  if (col === "link") return (
                    <td key={col} className="px-5 py-4">
                      <Link
                        href={row[col]}
                        onClick={e => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Go to products
                      </Link>
                    </td>
                  );

                  if (col === "view") return (
                    <td key={col} className="px-5 py-4">
                      <button
                        onClick={row[col]}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View quote
                      </button>
                    </td>
                  );

                  return (
                    <td key={col} className="px-5 py-4 align-top min-w-50">

                      {/* VALUE DISPLAY */}
                      <div className="text-gray-800 mb-1">
                        {(("" + row[col]).trim() === ("" + changesForRow[col]).trim())
                          ? <p>{truncate(row[col])}</p>
                          : <>
                            <span className='text-red-500 line-through'>
                              {truncate(row[col])}
                            </span>

                            <span className='mx-2 text-gray-300'>→</span>

                            <span className='text-emerald-600 font-medium'>
                              {truncate(changesForRow[col])}
                            </span>
                          </>
                        }
                      </div>

                      {/* EDIT INPUT */}
                      <form onSubmit={e => e.preventDefault()}>
                        <input
                          type="text"
                          name={col}
                          onClick={e => e.stopPropagation()}
                          defaultValue={"" + changesForRow[col]}
                          onChange={e => {
                            changesForRow[col] = e.currentTarget.value;
                          }}
                          onBlur={saveChanges}
                          className="
                            group-[:not(.selected)]:hidden
                            w-full
                            mt-1
                            rounded-lg
                            border
                            border-gray-200
                            px-3
                            py-1.5
                            text-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-(--secondary)
                            focus:border-(--secondary)
                            bg-white
                          "
                        />
                      </form>

                    </td>
                  )
                })}
              </tr>
            )})}
          </tbody>

        </table>

      </div>
    </div>
  );
}