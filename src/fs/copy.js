import fs from "node:fs/promises";
import { join } from "node:path";

const copy = async () => {
  const sourceFolderPath = join(process.cwd(), "src", "fs", "files");
  const copyFolderPath = join(process.cwd(), "src", "fs", "files_copy");

  try {
    const sourceExists = await fs
      .access(sourceFolderPath)
      .then(() => true)
      .catch(() => false);
    if (!sourceExists) {
      throw new Error("FS operation failed");
    }

    const copyFolderExists = await fs
      .access(copyFolderPath)
      .then(() => true)
      .catch(() => false);
    if (copyFolderExists) {
      throw new Error("FS operation failed");
    }

    await fs.cp(sourceFolderPath, copyFolderPath, { recursive: true });
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await copy()
  .then(() => console.log("Folder created successfully"))
  .catch((error) => console.error(error.message));
