import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

// Wrap the existing rosa PNG in an ICO container without resampling it.
const png = await readFile(new URL("../public/favicon.png", import.meta.url));
assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
assert(width > 0 && width <= 256 && height > 0 && height <= 256);
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); // Icon type.
header.writeUInt16LE(1, 4); // One image; zero width/height bytes mean 256px.
header[6] = width % 256;
header[7] = height % 256;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(header.length, 18);
await writeFile(new URL("../public/favicon.ico", import.meta.url), Buffer.concat([header, png]));
