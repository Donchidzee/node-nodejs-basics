import fs from "node:fs/promises";
import { join } from "node:path";

const read = async () => {
  const fileToRead = join(
    process.cwd(),
    "src",
    "fs",
    "files",
    "fileToRead.txt"
  );

  try {
    await fs.access(fileToRead);
    const content = await fs.readFile(fileToRead, "utf-8");
    console.log(content);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await read()
  .then(() => console.log("File read successfully"))
  .catch((error) => console.error(error.message));
