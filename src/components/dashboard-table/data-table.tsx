"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/button";
import { Copy, Download, Expand } from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <td />
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Collapsible key={row.id} asChild>
                <>
                  <TableRow
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    key={row.id}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={"ghost"}
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Expand />
                      </Button>
                    </CollapsibleTrigger>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="truncate max-w-[200px]"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <CollapsibleContent asChild>
                    <TableRow>
                      <TableCell colSpan={columns.length + 1}>
                        <div className="flex justify-between gap-4">
                          <div className="w-1/2">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm font-medium">
                                Input details
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="cursor-pointer"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      JSON.stringify(
                                        typeof row.original.input === "string"
                                          ? JSON.parse(row.original.input)
                                          : row.original.input,
                                        null,
                                        2
                                      )
                                    )
                                  }
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                </Button>
                                <Button
                                  size="icon"
                                  className="cursor-pointer"
                                  onClick={() => {
                                    const blob = new Blob(
                                      [
                                        JSON.stringify(
                                          typeof row.original.input === "string"
                                            ? JSON.parse(row.original.input)
                                            : row.original.input,
                                          null,
                                          2
                                        ),
                                      ],
                                      { type: "application/json" }
                                    );
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = `input-${row.id}.json`;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                  }}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                </Button>
                              </div>
                            </div>
                            <pre className="bg-gray-200/60 rounded-md p-2 whitespace-pre-wrap break-words overflow-y-auto max-h-[200px] overflow-x-auto">
                              {JSON.stringify(
                                typeof row.original.input === "string"
                                  ? JSON.parse(row.original.input)
                                  : row.original.input,
                                null,
                                2
                              )}
                            </pre>
                          </div>
                          <div className="w-1/2">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm font-medium">
                                Output details
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="cursor-pointer"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      JSON.stringify(
                                        typeof row.original.output === "string"
                                          ? JSON.parse(row.original.output)
                                          : row.original.output,
                                        null,
                                        2
                                      )
                                    )
                                  }
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                </Button>
                                <Button
                                  size="icon"
                                  className="cursor-pointer"
                                  onClick={() => {
                                    const blob = new Blob(
                                      [
                                        JSON.stringify(
                                          typeof row.original.output ===
                                            "string"
                                            ? JSON.parse(row.original.output)
                                            : row.original.output,
                                          null,
                                          2
                                        ),
                                      ],
                                      { type: "application/json" }
                                    );
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement("a");
                                    a.href = url;
                                    a.download = `output-${row.id}.json`;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                  }}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                </Button>
                              </div>
                            </div>
                            <pre className="bg-gray-200/60 rounded-md p-2 whitespace-pre-wrap break-words overflow-y-auto max-h-[200px]">
                              {JSON.stringify(
                                typeof row.original.output === "string"
                                  ? JSON.parse(row.original.output)
                                  : row.original.output,
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
