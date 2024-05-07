"use client";

import { Animals } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellActionAnimal } from "./cell-action";

export const columns: ColumnDef<Animals>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionAnimal data={row.original} />,
  },
];
