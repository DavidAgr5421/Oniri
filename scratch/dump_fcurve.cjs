const fs = require('fs');
const fflate = require('fflate');

const filePath = 'C:/Users/USUARIO/Downloads/DbZombiesCa1p.clip';
const buf = fs.readFileSync(filePath);

// Track 59 offset: 142851809
// Track 60 offset: 142856417
function dumpTrackChunk(name, offset) {
  console.log(`\n=== DUMP ${name} (Offset ${offset}) ===`);
  const view = new DataView(buf.buffer, buf.byteOffset + offset);
  const chunkLen = Number(view.getBigUint64(8, false));
  console.log('Chunk length:', chunkLen);
  const data = buf.subarray(offset + 16, offset + 16 + chunkLen);
  
  let zstart = -1;
  for (let i = 0; i < Math.min(120, data.length - 2); i++) {
    if (data[i] === 0x78 && (data[i + 1] === 0x01 || data[i + 1] === 0x9c || data[i + 1] === 0xda)) {
      zstart = i;
      break;
    }
  }
  console.log('Zlib start:', zstart);
  if (zstart === -1) return;

  const decomp = fflate.unzlibSync(data.subarray(zstart));
  console.log('Decompressed length:', decomp.length);

  // Buscar FCurve
  const decompStr = Buffer.from(decomp).toString('latin1');
  console.log('Strings en decomp (primeros 500 chars imprimibles):');
  let printables = '';
  for (let i = 0; i < decomp.length; i++) {
    const c = decomp[i];
    if (c >= 32 && c <= 126) printables += String.fromCharCode(c);
    else if (printables.length > 0 && printables[printables.length - 1] !== ' ') printables += ' ';
  }
  console.log(printables.slice(0, 400));

  // Buscar patrones de cel names y floats
  const fcurveIdx = decompStr.indexOf('FCurve');
  console.log('FCurve index:', fcurveIdx);
  if (fcurveIdx !== -1) {
    const constIdx = decompStr.indexOf('Constant', fcurveIdx);
    console.log('Constant index:', constIdx);
    if (constIdx !== -1) {
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
        const celName = Buffer.from(decomp.subarray(p + 1, p + 1 + slen)).toString('latin1');
        celNames.push(celName);
        p += 1 + slen;
      }
      console.log(`Encontrados ${celNames.length} celNames:`, celNames.slice(0, 15), '... total:', celNames.length);

      // Inspeccionar bytes después de celNames
      console.log(`Bytes a partir de p=${p}:`, Buffer.from(decomp.subarray(p, p + 64)).toString('hex'));
      
      // Intentar leer floats o enteros
      console.log('Lecturas posibles a partir de p:');
      for (let offset = p; offset < p + 128; offset += 4) {
        const dv = new DataView(decomp.buffer, decomp.byteOffset + offset);
        const f32 = dv.getFloat32(0, true);
        const i32 = dv.getInt32(0, true);
        const u32 = dv.getUint32(0, true);
        console.log(`off +${offset - p}: i32=${i32}, u32=${u32}, f32=${f32.toFixed(2)}`);
      }
    }
  }
}

dumpTrackChunk('Track 59 (sketch)', 142851809);
dumpTrackChunk('Track 60 (final)', 142856417);
