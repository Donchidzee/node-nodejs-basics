import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { join } from "node:path";

const decompress = async () => {
  const compressedFilePath = join(
    process.cwd(),
    "src",
    "zip",
    "files",
    "archive.gz"
  );
  const decompressedFilePath = join(
    process.cwd(),
    "src",
    "zip",
    "files",
    "fileToCompress.txt"
  );

  try {
    const readStream = createReadStream(compressedFilePath);
    const writeStream = createWriteStream(decompressedFilePath);
    const gunzip = createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);
  } catch (error) {
    console.error(error.message);
  }
};

await decompress();
