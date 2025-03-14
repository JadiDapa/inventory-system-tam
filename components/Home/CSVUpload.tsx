import React, { useState } from "react";
import Papa from "papaparse";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/lib/networks/item";
import { ItemType } from "@/lib/types/item";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";

interface CSVUploadProps {
  onFileUpload: (file: File) => void; // Prop for passing file to parent
}

export default function CSVUpload({ onFileUpload }: CSVUploadProps) {
  const [data, setData] = useState<InputItem[]>([]);

  const { data: items } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  function findItem(name: string) {
    return items?.find((item) => item.name === name);
  }

  // Handle file upload and parsing
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setData(results.data as InputItem[]);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="w-full space-y-6 lg:w-[520px]">
        <div className="rounded-md bg-tertiary p-6 shadow-md">
          <p className="text-xl font-medium">Upload CSV File</p>
          <p className="text-sm">{`CSV Format: "ItemName" & "SerialNumber"`}</p>
          <Button className="relative mt-3 flex items-center gap-2">
            Upload CSV
            <Upload />
            <input
              type="file"
              accept=".csv"
              className="absolute h-full w-full opacity-0"
              onChange={handleFileUpload}
            />
          </Button>
        </div>
      </div>
      <div className="w-full flex-wrap gap-6 rounded-md bg-tertiary p-6 shadow-md">
        {data.length > 0 && (
          <div>
            <p className="text-xl font-medium">Imported Data Items</p>
            <CSVTable findItem={findItem} data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

interface CSVTableProps {
  data: InputItem[];
  findItem: (code: string) => ItemType | undefined;
}

interface InputItem {
  ItemName: string;
  SerialNumber: number;
  Quantity: number;
}

interface GroupedItem {
  ItemName: string;
  SerialNumbers: Array<{ number: number; quantity: number }>;
}

export function CSVTable({ data, findItem }: CSVTableProps) {
  const grouped = data.reduce<
    Record<string, Array<{ number: number; quantity: number }>>
  >((acc, current) => {
    const key = current.ItemName;
    if (!acc[key]) {
      acc[key] = [];
    }
    // Store both serial number and quantity
    acc[key].push({
      number: current.SerialNumber,
      quantity: current.Quantity,
    });
    return acc;
  }, {});

  const result: GroupedItem[] = Object.entries(grouped)
    .map(([ItemName, SerialNumbers]) => ({
      ItemName,
      SerialNumbers,
    }))
    .filter((item) => item.ItemName !== "null");

  console.log(result);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {result.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>{findItem(row.ItemName)?.Brand.name}</TableCell>
            <TableCell>{findItem(row.ItemName)?.Product.name}</TableCell>
            <TableCell>{findItem(row.ItemName)?.name}</TableCell>
            <TableCell className="flex w-28 items-center justify-between lg:w-44">
              <p>
                {row.SerialNumbers.reduce(
                  (sum, sn) => Number(sum) + Number(sn.quantity),
                  0,
                )}
              </p>

              {row.SerialNumbers.find((sn) => sn.number !== null) && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Badge>Detail</Badge>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        Serial Number : {findItem(row.ItemName)?.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      {row.SerialNumbers.map((sn, index) => (
                        <div key={sn.number} className="flex gap-2">
                          <p className="w-4 font-medium">{index + 1}.</p>
                          <p className="">{sn.number}</p>
                        </div>
                      ))}
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
