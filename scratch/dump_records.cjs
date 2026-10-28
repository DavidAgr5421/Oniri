const fs = require('fs');
const fflate = require('fflate');

const buf = fs.readFileSync('C:/Users/USUARIO/Downloads/DbZombiesCa1p.clip');

function dumpRecords(offset) {
  const view = new DataView(buf.buffer, buf.byteOffset + offset);
  const chunkLen = Number(view.getBigUint64(8, false));
  const data = buf.subarray(offset + 16, offset + 16 + chunkLen);
  let zstart = -1;
  for (let i = 0; i < 120; i++) {
    if (data[i] === 0x78 && (data[i + 1] === 0x01 || data[i + 1] === 0x9c || data[i + 1] === 0xda)) {
      zstart = i; break;
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
  
  console.log(`p=${p}, celNames len=${celNames.length}`);
  console.log('Primeros 20 celNames:', celNames.slice(0, 20));

  // Inspeccionar los bytes desde p hasta el final de forma estructurada
  console.log('\nBytes desde p (en grupos de 16 bytes):');
  for (let pos = p; pos < p + 320; pos += 16) {
    const slice = decomp.subarray(pos, pos + 16);
    const hex = Buffer.from(slice).toString('hex');
    const ints = [];
    for (let i = 0; i < slice.length; i += 4) {
      ints.push(new DataView(slice.buffer, slice.byteOffset + i).getInt32(0, true));
    }
    console.log(`+${pos - p} [${pos}]: hex=${hex} | ints=${ints.join(', ')}`);
  }
}

dumpTrackChunk = dumpRecords;
dumpRecords(142851809);
