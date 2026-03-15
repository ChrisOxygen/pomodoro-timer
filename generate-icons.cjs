// generate-icons.cjs — pure Node.js PNG generator, no external deps
const zlib = require("zlib");
const fs = require("fs");

function crc32(buf) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++)
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const payload = Buffer.concat([typeBytes, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(payload), 0);
  return Buffer.concat([len, payload, crcBuf]);
}

function generatePNG(size) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  // rest zeros (compression, filter, interlace)

  // Design: #1E213F background, #F87070 circle (pomodoro tomato)
  const bg = [0x1e, 0x21, 0x3f];
  const fg = [0xf8, 0x70, 0x70];
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  const raw = Buffer.alloc(size * (1 + size * 3));
  let off = 0;
  for (let y = 0; y < size; y++) {
    raw[off++] = 0; // filter byte
    for (let x = 0; x < size; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const col = dx * dx + dy * dy < r * r ? fg : bg;
      raw[off++] = col[0];
      raw[off++] = col[1];
      raw[off++] = col[2];
    }
  }

  const compressed = zlib.deflateSync(raw);

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

fs.writeFileSync("public/pwa-192x192.png", generatePNG(192));
fs.writeFileSync("public/pwa-512x512.png", generatePNG(512));
console.log("Generated pwa-192x192.png and pwa-512x512.png");
