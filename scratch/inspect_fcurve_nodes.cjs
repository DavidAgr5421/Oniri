const fs = require('fs');
const fflate = require('fflate');

const filePath = 'C:/Users/USUARIO/Downloads/DbZombiesCa1p.clip';
const buf = fs.readFileSync(filePath);

function inspectFCurveNodes(offset) {
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
  
  // Buscar dónde está "Frame" y "Value"
  const frameStrIdx = decompStr.indexOf('Frame');
  const valueStrIdx = decompStr.indexOf('Value');
  const constStrIdx = decompStr.indexOf('Constant');
  console.log({ frameStrIdx, valueStrIdx, constStrIdx });

  // Buscar todas las ocurrencias de Strings de cels y sus índices
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
  console.log(`Leídos ${celNames.length} celNames.`);

  // Veamos qué hay después de celNames:
  // Veamos secuencias de Frame / Value
  // Sabemos que los frames en esta animación van de 0 a 300
  // Busquemos dónde aparecen números que crecen secuencialmente de 0 a 300
  console.log('Buscando arrays de frames (0 a 300) en el archivo...');
  for (let pos = p; pos < decomp.length - 32; pos += 2) {
    // Si interpretamos como float32 o int32 o float64
    const dv = new DataView(decomp.buffer, decomp.byteOffset + pos);
    const f1 = dv.getFloat32(0, true);
    const f2 = dv.getFloat32(4, true);
    const f3 = dv.getFloat32(8, true);
    if (f1 === 0 && f2 > 0 && f2 < 300 && f3 > f2 && f3 < 300) {
      console.log(`Posible secuencia float32 en pos ${pos}: f1=${f1}, f2=${f2}, f3=${f3}`);
    }
    const d1 = dv.getFloat64(0, true);
    const d2 = dv.getFloat64(8, true);
    if (d1 === 0 && d2 > 0 && d2 < 300) {
      console.log(`Posible secuencia float64 en pos ${pos}: d1=${d1}, d2=${d2}`);
    }
    const i1 = dv.getInt32(0, true);
    const i2 = dv.getInt32(4, true);
    const i3 = dv.getInt32(8, true);
    if (i1 === 0 && i2 > 0 && i2 < 300 && i3 > i2 && i3 < 300) {
      console.log(`Posible secuencia int32 en pos ${pos}: i1=${i1}, i2=${i2}, i3=${i3}`);
    }
  }
}

inspectFCurveNodes(142851809);
