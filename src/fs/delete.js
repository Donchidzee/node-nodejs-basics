import fs from "node:fs/promises";
import { join } from "node:path";

const remove = async () => {
  const fileToRemovePath = join(
    process.cwd(),
    "src",
    "fs",
    "files",
    "fileToRemove.txt"
  );

  try {
    await fs.access(fileToRemovePath);
    await fs.rm(fileToRemovePath);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await remove()
  .then(() => console.log("File deleted successfully"))
  .catch((error) => console.error(error.message));
