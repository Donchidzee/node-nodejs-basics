import { Worker } from "worker_threads";
import { cpus } from "os";
import { join } from "node:path";

const performCalculations = async () => {
  const numCPUs = cpus().length;
  const startNumber = 10;
  const results = new Array(numCPUs);
  const filePath = join(process.cwd(), "src", "wt", "worker.js");

  const promises = Array.from({ length: numCPUs }, (_, index) => {
    const worker = new Worker(filePath);
    const numberToSend = startNumber + index;

    return new Promise((resolve) => {
      worker.postMessage(numberToSend);

      worker.on("message", (result) => {
        results[index] = { status: "resolved", data: result };
        resolve();
      });

      worker.on("error", () => {
        results[index] = { status: "error", data: null };
        resolve();
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          results[index] = { status: "error", data: null };
          resolve();
        }
      });
    });
  });

  await Promise.all(promises);
  console.log(results);
};

await performCalculations();
