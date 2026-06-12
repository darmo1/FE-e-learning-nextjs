"use client";
import { useMemo, useState } from "react";
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type CourseRow = {
  course_id: number | string;
  course_title: string;
  category: string;
  number_of_students: number;
  active?: boolean;
};

type CourseTable = CourseRow[];

const fallbackData: CourseTable = [];

export const CoursesTable = ({
  coursesTable,
}: {
  coursesTable: CourseTable;
}) => {
  const columnDefers: ColumnDef<CourseRow>[] = [
    {
      header: "Curso",
      accessorKey: "course_title",
      cell: (info: CellContext<CourseRow, unknown>) => (
        <span className="font-medium text-gray-900">
          {String(info.getValue() ?? "")}
        </span>
      ),
    },
    {
      header: "Categoría",
      accessorKey: "category",
      cell: (info: CellContext<CourseRow, unknown>) => (
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {String(info.getValue() ?? "")}
        </span>
      ),
    },
    {
      header: "Estudiantes",
      accessorKey: "number_of_students",
      cell: (info: CellContext<CourseRow, unknown>) => (
        <span className="tabular-nums">{Number(info.getValue() ?? 0)}</span>
      ),
    },
    {
      header: "Estado",
      accessorKey: "active",
      cell: () => (
        <span className="inline-flex items-center gap-1.5 text-gray-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Activo
        </span>
      ),
    },
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => columnDefers, []);
  const [data] = useState(() => coursesTable);

  const table = useReactTable({
    data: data ?? fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                Aún no hay datos de cursos
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
