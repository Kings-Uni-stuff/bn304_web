"use client";

import { Entry } from "@/types/entry";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Entry>[] = [
    {
        accessorKey: "camera",
        header: "Camera",
    },
    {
        accessorKey: "filename",
        header: "File Name",
        cell: ({ row }) => (
            <a
                className="text-blue-400 underline underline-offset-2"
                href={`https://ucarecdn.com/${row.getValue("filename")}/`}
            >
                {row.getValue("filename")}
            </a>
        ),
    },
    {
        accessorKey: "file_type",
        header: "File Type",
    },
    {
        accessorKey: "time_stamp",
        header: "Time Stamp",
    },
    {
        accessorKey: "movie_end",
        header: "Move End",
    },
];
