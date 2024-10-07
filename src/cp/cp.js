import { spawn } from "node:child_process";
import { stdin, stdout } from "node:process";

const spawnChildProcess = (args) => {
  const child = spawn("node", ["./src/cp/files/script.js", ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });
  stdin.pipe(child.stdin);
  child.stdout.pipe(stdout);
  child.on("exit", (code) => {
    console.log(`Exited with code ${code}`);
  });
};

const args = process.argv.slice(2);
spawnChildProcess(args);
