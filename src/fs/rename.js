import fs from "node:fs/promises";
import { join } from "node:path";

const rename = async () => {
  const oldFilePath = join(
    process.cwd(),
    "src",
    "fs",
    "files",
    "wrongFilename.txt"
  );
  const renamedFilePath = join(
    process.cwd(),
    "src",
    "fs",
    "files",
    "properFilename.md"
  );

  try {
    const wrongFilenameExists = await fs
      .access(oldFilePath)
      .then(() => true)
      .catch(() => false);
    if (!wrongFilenameExists) {
      throw new Error("FS operation failed");
    }

    const properFilenameExists = await fs
      .access(renamedFilePath)
      .then(() => true)
      .catch(() => false);
    if (properFilenameExists) {
      throw new Error("FS operation failed");
    }

    await fs.rename(oldFilePath, renamedFilePath);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await rename()
  .then(() => console.log("File renamed successfully"))
  .catch((error) => console.error(error.message));
