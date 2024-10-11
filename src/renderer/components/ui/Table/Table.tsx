import React from 'react';

export type TableColumn<R extends Record<string, any>> = {
  key: Extract<keyof R, string>;
  title: string;
  renderRow?: (row: R) => React.ReactNode;
};

interface Props<R extends Record<string, any>> {
  columns: TableColumn<R>[];
  rows: R[];
  rowKey: Extract<keyof R, string>;
}

const Table = <R extends Record<string, any>>({
  columns,
  rows,
  rowKey,
}: Props<R>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows
            .filter((row) => row.isDeleted === 1)
            .map((row) => (
              <tr key={row[rowKey]} className="hover:bg-gray-100">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-3 px-4 border-b border-gray-200"
                  >
                    {col.renderRow ? col.renderRow(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
