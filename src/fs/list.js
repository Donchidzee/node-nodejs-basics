import fs from "node:fs/promises";
import { join } from "node:path";

const list = async () => {
  const filesFolderPath = join(process.cwd(), "src", "fs", "files");

  try {
    const filesFolderExists = await fs
      .access(filesFolderPath)
      .then(() => true)
      .catch(() => false);
    if (!filesFolderExists) {
      throw new Error("FS operation failed");
    }

    const files = await fs.readdir(filesFolderPath);
    console.log(files);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await list()
  .then(() => console.log("Files printed successfully"))
  .catch((error) => console.error(error.message));
