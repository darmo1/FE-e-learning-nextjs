"use client";
import {  useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

type CourseTable = {
  course_id: number | string;
  course_title: string;
  category: string;
  number_of_students: number
}[];



const fallbackData = [];
export const CoursesTable = ({ coursesTable }:{
  coursesTable : CourseTable
}) => {
  const columnDefers = [
    {
      header: "ID",
      accessorKey: "course_id",
    },
    {
      header: "Titulo",
      accessorKey: "course_title",
      cell: (info) => info.getValue(),
    },
    {
      header: "Categoria ",
      accessorKey: "category",
      cell: (info) => info.getValue(),
    },
    {
      header: "Estudiantes",
      accessorKey: "number_of_students",
      cell: (info) => info.getValue()},
    {
      header: "Estado",
      accessorKey: "active",
      cell: (info) =>
        !info.getValue() ? (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-4xl"> </div>Activo
          </div>
        ) : (
          "Inactivo"
        ),
    },
  ];
  const columns = useMemo(() => columnDefers, []);
  const [data, ] = useState(() => coursesTable
);

  const table = useReactTable({
    data: data ?? fallbackData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });
  return (
   
      <div>
        <table>
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border px-4 py-2 text-center">
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                    {{
                      asc: <ArrowDownWideNarrow className="inline ml-1" />,
                      desc: <ArrowUpWideNarrow className="inline ml-1" />,
                    }[header.column.getIsSorted() as "asc" | "desc"] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-center border px-4" >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
};
