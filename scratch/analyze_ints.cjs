const fs = require('fs');
const fflate = require('fflate');

const filePath = 'C:/Users/USUARIO/Downloads/DbZombiesCa1p.clip';
const buf = fs.readFileSync(filePath);

function analyze(offset) {
  const view = new DataView(buf.buffer, buf.byteOffset + offset);
  const chunkLen = Number(view.getBigUint64(8, false));
  const data = buf.subarray(offset + 16, offset + 16 + chunkLen);
  let zstart = -1;
  for (let i = 0; i < Math.min(120, data.length - 2); i++) {
    if (data[i] === 0x78 && (data[i + 1] === 0x01 || data[i + 1] === 0x9c || data[i + 1] === 0xda)) {
      zstart = i;
      break;
    }
  }
  const decomp = fflate.unzlibSync(data.subarray(zstart));
  const decompStr = Buffer.from(decomp).toString('latin1');
  const constIdx = decompStr.indexOf('Constant');
  let p = constIdx + 8;
  const celNames = [];
  while (p < decomp.length) {
    const slen = decomp[p];
    if (slen === 0 || slen > 30) break;
    let isAscii = true;
    for (let j = 0; j < slen; j++) {
      const b = decomp[p + 1 + j];
      if (b < 32 || b > 126) { isAscii = false; break; }
    }
    if (!isAscii) break;
    celNames.push(Buffer.from(decomp.subarray(p + 1, p + 1 + slen)).toString('latin1'));
    p += 1 + slen;
  }
  
  console.log('p final tras strings:', p, 'total celNames:', celNames.length);
  // Ver los siguientes 200 int32s
  const ints = [];
  for (let i = p; i < p + 400; i += 4) {
    const dv = new DataView(decomp.buffer, decomp.byteOffset + i);
    ints.push(dv.getInt32(0, true));
  }
  console.log('Primeros 50 ints tras strings:\n', ints.slice(0, 50));
}

analyze(142851809); // Track 59
