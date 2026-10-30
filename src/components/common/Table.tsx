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
  emptyText = 'No records found',
  keyExtractor,
}: TableProps<T>) {
  return (
<<<<<<< HEAD
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-cream text-[11px] font-semibold text-slate-600 uppercase tracking-[0.12em]">
=======
    <div className="w-full overflow-x-auto rounded-md border border-gray-200 bg-white">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700">
>>>>>>> 107f6ad (final changes)
            {columns.map((col) => (
              <th key={col.key} className={`px-3.5 py-2.5 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-800">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-xs">Loading records...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                  <Inbox className="w-7 h-7 stroke-1" />
                  <span className="text-xs font-medium text-slate-500">{emptyText}</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="hover:bg-slate-50/80 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3.5 ${col.className || ''}`}>
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
