import fs from "node:fs/promises";
import { join } from "node:path";

const create = async () => {
  const content = "I am fresh and young";
  const filePath = join(process.cwd(), "src", "fs", "files", "fresh.txt");

  try {
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, content);
    } else {
      throw error;
    }
  }
};

create()
  .then(() => console.log("File created successfully"))
  .catch((error) => console.error(error.message));
