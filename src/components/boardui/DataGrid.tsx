import React from "react";

export interface DataColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "right" | "center";
}

export function DataGrid<T extends { id: string | number }>({
  columns,
  data,
  caption,
  className = "",
}: {
  columns: readonly DataColumn<T>[];
  data: readonly T[];
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 ${className}`}
    >
      <table className="w-full text-left font-mono text-xs">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="border-b border-neutral-800 bg-neutral-900/60 text-[10px] uppercase tracking-wider text-neutral-400">
          <tr>
            {columns.map((col, i) => (
              <th
                key={String(col.key) + i}
                scope="col"
                className={`px-4 py-3 font-semibold ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                      ? "text-center"
                      : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-900 text-neutral-300">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-neutral-900/30 transition-colors">
              {columns.map((col, i) => (
                <td
                  key={String(col.key) + i}
                  className={`px-4 py-3 whitespace-nowrap ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                        ? "text-center"
                        : "text-left"
                  }`}
                >
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key as string] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
