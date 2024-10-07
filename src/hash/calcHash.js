import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const calcHash = async () => {
  const filePath = join(
    process.cwd(),
    "src",
    "hash",
    "files",
    "fileToCalculateHashFor.txt"
  );

  try {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);

    stream.on("data", (chunk) => {
      hash.update(chunk);
    });

    stream.on("end", () => {
      const fileHash = hash.digest("hex");
      console.log(`SHA256 hash (hex): ${fileHash}`);
    });

    stream.on("error", (error) => {
      throw new Error("FS operation failed");
    });
  } catch (error) {
    console.error(error.message);
  }
};

await calcHash();
