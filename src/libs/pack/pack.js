// packer.js
import fs from "fs";
import path from "path";

function pack(files, output) {
  const out = fs.createWriteStream(output);

  for (const file of files) {
    const name = path.basename(file); // 仅保存文件名
    const nameBuf = Buffer.from(name, "utf8");
    const dataBuf = fs.readFileSync(file);

    const nameLenBuf = Buffer.alloc(4);
    nameLenBuf.writeUInt32BE(nameBuf.length);

    const dataLenBuf = Buffer.alloc(8);
    dataLenBuf.writeBigUInt64BE(BigInt(dataBuf.length));

    out.write(nameLenBuf);
    out.write(nameBuf);
    out.write(dataLenBuf);
    out.write(dataBuf);
  }

  out.end();
  console.log(`✅ Packed ${files.length} files into ${output}`);
}

// 用法：node packer.js a.png b.mp3 data.json bundle.pack
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: node packer.js <file1> <file2> ... <output.pack>");
  process.exit(1);
}
const output = args.pop();
pack(args, output);
