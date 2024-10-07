import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { join } from "node:path";

const compress = async () => {
  const filePath = join(
    process.cwd(),
    "src",
    "zip",
    "files",
    "fileToCompress.txt"
  );
  const compressedFilePath = join(
    process.cwd(),
    "src",
    "zip",
    "files",
    "archive.gz"
  );

  try {
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(compressedFilePath);
    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);
  } catch (error) {
    console.error(error.message);
  }
};

await compress();
