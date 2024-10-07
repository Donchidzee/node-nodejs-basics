import { Transform } from "node:stream";

const reverseTextTransform = new Transform({
  transform(chunk, encoding, callback) {
    const reversed = chunk.toString().split("").reverse().join("");
    callback(null, reversed);
  },
});

const transform = async () => {
  process.stdin.pipe(reverseTextTransform).pipe(process.stdout);
};

await transform();
