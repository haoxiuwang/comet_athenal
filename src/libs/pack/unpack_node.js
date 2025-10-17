// unpacker.js
import fs from "fs";

function unpack(input, outputDir) {
  const buf = fs.readFileSync(input);
  let offset = 0;

  while (offset < buf.length) {
    const nameLen = buf.readUInt32BE(offset);
    offset += 4;

    const name = buf.slice(offset, offset + nameLen).toString();
    offset += nameLen;

    const dataLen = buf.readBigUInt64BE(offset);
    offset += 8;

    const data = buf.slice(offset, offset + Number(dataLen));
    offset += Number(dataLen);

    const outPath = `${outputDir}/${name}`;
    fs.mkdirSync(fs.dirname?.(outPath) || ".", { recursive: true });
    fs.writeFileSync(outPath, data);
    console.log(`✅ Unpacked: ${name}`);
  }

  console.log("🎉 Unpack complete!");
}

// 用法示例：node unpacker.js bundle.pack output_dir

  const [input, outputDir] = process.argv.slice(2);
if (!input || !outputDir) {
  console.error("Usage: node unpacker.js <bundle.pack> <output_dir>");
  process.exit(1);
}

unpack(input, outputDir);

