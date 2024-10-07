import { createWriteStream } from "node:fs";

const write = () => {
  const writableStream = createWriteStream(
    "./src/streams/files/fileToWrite.txt"
  );

  process.stdin.pipe(writableStream);

  writableStream.on("finish", () => {
    console.log("Data has been written to fileToWrite.txt successfully");
  });

  writableStream.on("error", (error) => {
    console.error("Error writing to file:", error.message);
  });
};

write();
