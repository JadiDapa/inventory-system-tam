import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";

interface ExcelExportProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  filename: string;
}

export default function ExcelExport({ data, filename }: ExcelExportProps) {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, filename);
  };

  return (
    <Button
      onClick={exportToExcel}
      className="flex w-full items-center justify-center gap-2 rounded-md border border-primary bg-transparent text-primary hover:text-white"
    >
      <Upload size={20} strokeWidth={2.25} />
      <div className="">Export Data</div>
    </Button>
  );
}
