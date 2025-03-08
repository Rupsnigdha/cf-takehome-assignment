"use client";

import { Settings, Trash2 } from "lucide-react";
import React from "react";
import { columns } from "@/components/dashboard-table/columns";
import { DataTable } from "@/components/dashboard-table/data-table";
import { useTableDataStore } from "@/stores/tableDataStore";

function Page() {
  const { data } = useTableDataStore();
  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded-lg p-2 px-4">
        <div className="flex justify-between">
          <div className="flex gap-2 items-end">
            <p className="text-lg line-clamp-1 leading-none">v1.1.0</p>
            <p className="font-bold text-sm leading-none">Primary Workflow</p>
          </div>
          <div className="flex gap-2">
            <div className="text-destructive ">
              <Trash2 />
            </div>
            <Settings />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap my-2 text-xs">
          <div className="px-2 py-1 bg-primary text-primary-foreground rounded-md">
            prod
          </div>
          <div className="px-2 py-1 bg-primary text-primary-foreground rounded-md">
            email
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          illo aliquam aut aperiam perspiciatis, possimus asperiores ab fugit
          animi assumenda dolorum quisquam, eos cum libero quam beatae corrupti
          omnis! Facere.
        </div>
        <div className="text-sm mt-2">
          <span>Deployed on:</span>{" "}
          <span className="font-bold">08th March, 2025; 12:00PM</span>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Page;
