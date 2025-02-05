import { ColumnDef } from "@tanstack/react-table";
import TableSorter from "@/components/Home/TableSorter";
import Link from "next/link";
import { UserType } from "../types/user";
import {
  EllipsisVertical,
  Eye,
  Pencil,
  Trash,
  UserCog2,
  UsersRound,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteDialog from "@/components/Home/DeleteDialog";
import { deleteItem } from "../networks/item";
import UpdateUserModal from "@/components/Home/users/UpdateUserModal";

export const userColumn: ColumnDef<UserType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => <TableSorter isFirst column={column} header="#" />,
    cell: ({ row }) => (
      <div className="translate-x-4 text-primary">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "username",
    accessorFn: (row) => row.username,
    header: ({ column }) => <TableSorter column={column} header="USERNAME" />,
    cell: ({ row }) => {
      const username = row.original.username as string;
      const email = row.original.email as string;

      return (
        <div>
          <div className="font-medium text-primary">{username}</div>
          <div className="">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    accessorFn: (row) => row.role,
    header: ({ column }) => <TableSorter column={column} header="ROLE" />,
    cell: ({ getValue }) => {
      const role = getValue();
      if (role === "admin") {
        return (
          <div className="flex items-center gap-2">
            <UserCog2 size={26} strokeWidth={1.5} />{" "}
            <p className="text-green-500">Admin</p>
          </div>
        );
      }
      if (role === "employee") {
        return (
          <div className="flex items-center gap-2">
            <UsersRound size={26} strokeWidth={1.5} />{" "}
            <p className="text-yellow-500">Employee</p>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "requests",
    accessorFn: (row) => row.Request?.length,
    header: ({ column }) => <TableSorter column={column} header="REQUESTS" />,
    cell: ({ getValue }) => (
      <div className="text-xl text-primary">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "function",
    header: ({ column }) => <TableSorter column={column} header="ACT" />,
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical strokeWidth={1.5} />
        </PopoverTrigger>
        <PopoverContent className="flex max-w-fit gap-3 px-3 py-1 text-primary">
          <Link href={`/users/${row.original.username}`}>
            <Eye size={20} className="cursor-pointer" />
          </Link>
          <UpdateUserModal user={row.original}>
            <Pencil size={20} className="cursor-pointer" />
          </UpdateUserModal>
          <DeleteDialog
            params={row.original.id!.toString()}
            deleteFunction={deleteItem}
            queryKey={["users", row.original.id!.toString()]}
          >
            <Trash size={20} className="cursor-pointer" />
          </DeleteDialog>
        </PopoverContent>
      </Popover>
    ),
  },
];
