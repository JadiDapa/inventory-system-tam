import fs from "fs";
import path from "path";
import os from "os";
import Papa from "papaparse";

export default async function readCSV(file: File): Promise<unknown[]> {
  // Use OS-specific temp directory
  const tempDir = path.join(os.tmpdir(), "uploads"); // This ensures cross-platform compatibility
  const tempPath = path.join(tempDir, file.name);

  // Ensure the directory exists
  await fs.promises.mkdir(tempDir, { recursive: true });

  // Convert File to Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Save file temporarily
  await fs.promises.writeFile(tempPath, buffer);

  // Read file content
  const fileContent = await fs.promises.readFile(tempPath, "utf8");

  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error: unknown) => reject(error),
    });
  });
}
