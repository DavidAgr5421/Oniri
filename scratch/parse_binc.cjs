const fs = require('fs');
const fflate = require('fflate');

const filePath = 'C:/Users/USUARIO/Downloads/DbZombiesCa1p.clip';
const buf = fs.readFileSync(filePath);

function parseBinc(offset) {
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
  console.log('Decompressed size:', decomp.length);

  // Imprimir los primeros 600 bytes en hex y ascii
  let s = '';
  for (let i = 0; i < 500; i++) {
    const b = decomp[i];
    s += (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.';
  }
  console.log('Ascii header:', s);

  // Buscar dónde están los números de cel y los tiempos
  // Si buscamos por ejemplo "60a" (que estaba en TrackValueMap) o los nombres de cels
  // Encontremos dónde aparece cada cel
}

parseBinc(142851809);
