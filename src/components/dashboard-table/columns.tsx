"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableStore } from "@/stores/tableStore";
import { useTableDataStore } from "@/stores/tableDataStore";

export type ExecutionRecord = {
  execId: string;
  execUser: string;
  status: "SUCCESS" | "FAILURE";
  latency: number;
  input: string;
  output: string;
  markForReview: boolean;
};

export const columns: ColumnDef<ExecutionRecord>[] = [
  {
    accessorKey: "execId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Execution ID
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "execUser",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Executed By
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex">
          <div
            className={cn(
              status === "SUCCESS" ? "text-green-500" : "text-red-500",
              "px-2 py-1 rounded-sm"
            )}
          >
            {row.getValue("status")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "latency",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Latency (s)
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("latency")} s</div>;
    },
  },
  {
    accessorKey: "input",
    header: "Input",
    cell: ({ row }) => {
      return (
        <div className="font-mono p-2 rounded">{row.getValue("input")}</div>
      );
    },
  },
  {
    accessorKey: "output",
    header: "Output",
    cell: ({ row }) => {
      return (
        <div className="font-mono p-2 rounded">{row.getValue("output")}</div>
      );
    },
  },
  {
    accessorKey: "markForReview",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="justify-end text-right"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mark for Review
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("markForReview") === true;
      const execId = row.original.execId;
      const { toggleMarkForReview } = useTableDataStore();
      return (
        <div className="flex justify-end">
          <Checkbox
            checked={value}
            className="mr-4"
            onCheckedChange={() => toggleMarkForReview(execId)}
          />
        </div>
      );
    },
  },
];
