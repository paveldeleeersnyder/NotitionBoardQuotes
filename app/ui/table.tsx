"use client"

import Link from 'next/link'
import { useState } from 'react';
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
  let inStorage = null;
  if (typeof window !== 'undefined') inStorage = localStorage.getItem(window.location.href);
  const [changes, setChanges] = useState((inStorage === null) ? structuredClone(rows) : JSON.parse(inStorage));

  const saveChanges = () => {
    localStorage.setItem(window.location.href, JSON.stringify(changes))
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm text-left">
        <thead>
          <tr className="bg-gray-300 border-b">
            {(columns.includes("path")) ? <th className="px-4 py-2 font-semibold text-gray-700">
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
              className="border-b even:bg-gray-50 hover:bg-gray-100 group"
              onClick={selectRow}
            >
            {(row["path"] !== undefined) ? <td key={-1} className="px-4 py-2 text-gray-800">
                    <button className="text-blue-700 hover:text-black" onClick={ async (e) => {
                      e.stopPropagation();
                      const link = await getQuoteLink(row["path"]);
                      window.open(link, "_newtab")
                    }}>
                      See quote
                    </button>
                </td> : <></>} 
              {columns.map((col) => {
                if (col === "link") return (
                    <td key={col} onClick={async e => {e.stopPropagation();}} className="px-4 py-2 text-gray-800">
                        <Link href={row[col]} className="text-blue-700 hover:text-black">
                            Go to products
                        </Link>
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
                  <div>{ ((""+row[col]).trim() === (""+changes[i][col]).trim())
                  ? <p>{truncate(row[col])}</p>
                  : <>
                      <span className='text-red-700 line-through'>{truncate(row[col])}</span>
                      <div className='p-1 inline'>|</div>
                      <span className='text-lime-700'>{truncate(changes[i][col])}</span></> }</div>
                  <form onSubmit={e => e.preventDefault()}>
                    <input type="text" 
                    name={col}
                    onClick={e => e.stopPropagation()}
                    defaultValue={"" + changes[i][col]}
                    onChange={e => {
                      console.log(e.currentTarget.value);
                      changes[i][col] = e.currentTarget.value;
                      setChanges(changes);
                    }}
                    onBlur={saveChanges}
                    className='group-[:not(.selected)]:hidden block border rounded-lg p-1'
                    />
                    </form>
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