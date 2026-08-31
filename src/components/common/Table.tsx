import React from 'react';
import { Inbox, Loader2 } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyText?: string;
  keyExtractor: (row: T) => string;
}

export function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyText = 'No data available',
  keyExtractor,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#1F293D] bg-[#111726]">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-[#1F293D] bg-[#0D1322] text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {columns.map((col) => (
              <th key={col.key} className={`px-5 py-3.5 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1F293D] text-slate-300">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  <span className="text-xs">Loading records...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                  <Inbox className="w-8 h-8 stroke-1" />
                  <span className="text-xs font-medium">{emptyText}</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="hover:bg-[#161F33] transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-5 py-4 ${col.className || ''}`}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
