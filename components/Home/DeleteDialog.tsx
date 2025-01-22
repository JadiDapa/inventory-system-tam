"use client";

import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type DeleteDialog = {
  params: string;
  deleteFunction: (params: string) => Promise<string>;
  queryKey: QueryKey;
  children?: ReactNode;
};

export default function DeleteDialog({
  params,
  deleteFunction,
  queryKey,
  children,
}: DeleteDialog) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation({
    mutationFn: () => deleteFunction(params),
    onSuccess: () => {
      setOpen(false);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: queryKey });
      toast.success("Data Berhasil Dihapus!");
    },
    onError: (error) => {
      toast.error("Terjadi Kesalahan Pada Server!");
      console.error(error);
    },
  });

  async function handleDelete() {
    await onDelete();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        {children ? (
          children
        ) : (
          <div className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <Trash className="size-5" />
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="font-inter bg-tertiary">
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin Ingin Menghapus Data Ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Data yang terhapus akan tidak dapat di kembalikan lagi, pastikan
            keputusan anda sebelum melanjutkan!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-700"
            onClick={handleDelete}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
