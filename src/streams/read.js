import { createReadStream } from "node:fs";
import { join } from "node:path";

const read = async () => {
  const filePath = join(
    process.cwd(),
    "src",
    "streams",
    "files",
    "fileToRead.txt"
  );

  try {
    const stream = createReadStream(filePath);

    stream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    stream.on("error", (error) => {
      throw new Error("FS operation failed");
    });

    stream.on("end", () => {
      console.log("\nFile read successfully");
    });
  } catch (error) {
    console.error(error.message);
  }
};

await read();
