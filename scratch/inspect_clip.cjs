const fs = require('fs');
const initSqlJs = require('sql.js');

async function main() {
  const filePath = 'C:/Users/USUARIO/Downloads/DbZombiesCa1p.clip';
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  const buf = fs.readFileSync(filePath);
  const sqliteMagic = Buffer.from('SQLite format 3\0');
  
  // Buscar de atras hacia adelante primero
  let idx = buf.lastIndexOf(sqliteMagic);
  if (idx === -1) idx = buf.indexOf(sqliteMagic);
  console.log('SQLite magic offset:', idx);

  const SQL = await initSqlJs();
  const db = new SQL.Database(buf.subarray(idx));

  const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table'")[0].values.flat();
  console.log('Tablas SQLite encontradas:', tables);

  console.log('\n--- TIMELINE ---');
  try {
    const tl = db.exec('SELECT * FROM TimeLine');
    if (tl.length > 0) {
      console.log(tl[0].columns);
      console.log(tl[0].values);
    }
  } catch (e) { console.log(e.message); }

  console.log('\n--- TRACK ---');
  try {
    const tr = db.exec('SELECT * FROM Track');
    if (tr.length > 0) {
      console.log('Columnas Track:', tr[0].columns);
      for (const row of tr[0].values) {
        console.log(row.map(v => (v instanceof Uint8Array ? Buffer.from(v).toString('hex') : v)));
      }
    }
  } catch (e) { console.log(e.message); }

  console.log('\n--- FOLDERS IN LAYER ---');
  try {
    const lay = db.exec("SELECT MainId, LayerName, LayerType, LayerFolder, AnimationFolder, LayerUuid, LayerFirstChildIndex, LayerNextIndex FROM Layer WHERE LayerFolder = 1 OR AnimationFolder = 1");
    if (lay.length > 0) {
      console.log('Columnas Layer folders:', lay[0].columns);
      for (const row of lay[0].values) {
        console.log(row.map(v => (v instanceof Uint8Array ? Buffer.from(v).toString('hex') : v)));
      }
    }
  } catch (e) { console.log(e.message); }

  console.log('\n--- EXTERNAL CHUNK KEYS PARA TRACKS ---');
  try {
    const ext = db.exec('SELECT ExternalID, Offset FROM ExternalChunk');
    if (ext.length > 0) {
      const extMap = new Map();
      for (const [id, off] of ext[0].values) {
        const key = typeof id === 'string' ? id : Buffer.from(id).toString('latin1');
        extMap.set(key, off);
      }
      console.log('Total external chunks:', extMap.size);

      // Ver tracks y sus ExternalChunks
      const tr = db.exec('SELECT MainId, TrackActionMixer, TrackValueMap, LayerUuidWithTrack FROM Track');
      if (tr.length > 0) {
        for (const [tId, mixer, valMap, lUuid] of tr[0].values) {
          const mixerKey = typeof mixer === 'string' ? mixer : Buffer.from(mixer).toString('latin1');
          console.log(`Track ${tId}: mixerKey=${mixerKey}, hasOffset=${extMap.has(mixerKey)}, offset=${extMap.get(mixerKey)}, lUuid=${Buffer.isBuffer(lUuid) || lUuid instanceof Uint8Array ? Buffer.from(lUuid).toString('hex') : lUuid}`);
        }
      }
    }
  } catch (e) { console.log(e.message); }
}

main().catch(console.error);
