export async function unpackPackFile(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  const decoder = new TextDecoder("utf-8");
  let offset = 0;
  const files = [];

  while (offset < arrayBuffer.byteLength) {
    // 文件名长度
    const nameLen = view.getUint32(offset);
    offset += 4;

    // 文件名
    const nameBytes = new Uint8Array(arrayBuffer, offset, nameLen);
    const name = decoder.decode(nameBytes);
    offset += nameLen;

    // 文件数据长度
    const dataLen = Number(view.getBigUint64(offset));
    offset += 8;

    // 文件数据
    const data = arrayBuffer.slice(offset, offset + dataLen);
    offset += dataLen;

    files.push({ name, data });
  }

  return files; // [{name: "a.png", data: ArrayBuffer}, ...]
}
