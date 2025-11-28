import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import PassengerCount from '../models/PassengerCount.models.js';

/**
 * Start reading from a serial port (default COM8) and store passenger counts in DB.
 * Expected serial line formats (flexible):
 *  - JSON: {"busId":"<id>","passengers":12,"percentage":50}
 *  - Plain number: "12"
 *  - Text containing a number: "COUNT: 12"
 *
 * Environment variables used:
 *  - SERIAL_PORT (default: COM8)
 *  - SERIAL_BAUD (default: 9600)
 *  - BUS_ID (optional: object id string to use when serial doesn't include busId)
 *  - BUS_CAPACITY (optional: used to compute percentage when not provided)
 *  - SERIAL_INTERVAL (default: 2000ms, interval to save buffered data to DB)
 */
const startSerialReader = () => {
  const path = process.env.SERIAL_PORT || 'COM8';
  const baudRate = parseInt(process.env.SERIAL_BAUD, 10) || 9600;
  const defaultBusId = process.env.BUS_ID || null;
  const busCapacity = process.env.BUS_CAPACITY ? parseInt(process.env.BUS_CAPACITY, 10) : null;
  const intervalMs = parseInt(process.env.SERIAL_INTERVAL, 10) || 2000; // Default: save every 2 seconds

  const port = new SerialPort({ path, baudRate, autoOpen: true });
  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  // Buffer to store parsed data
  let dataBuffer = [];
  let lastSaveTime = Date.now();

  port.on('open', () => {
    console.log(`[COM8] ✓ Serial port ${path} opened at ${baudRate} baud`);
  });
  
  port.on('error', (err) => {
    console.error(`[COM8] ✗ Error: ${err.message}`);
    if (err.message.includes('Access denied') || err.message.includes('EACCES')) {
      console.log('[COM8] 📌 SOLUTION: Close Arduino IDE Serial Monitor and restart backend');
      console.log('[COM8]   - Arduino IDE → Tools → Serial Monitor (Close the window)');
      console.log('[COM8]   - Then restart: npm run dev:server');
    }
  });

  // Function to save buffered data to DB
  const saveBufferedData = async () => {
    if (dataBuffer.length === 0) return;

    const toSave = [...dataBuffer];
    dataBuffer = [];

    console.log(`[COM8] Saving ${toSave.length} buffered record(s) to DB...`);

    for (const payload of toSave) {
      try {
        const saved = await PassengerCount.create(payload);
        console.log('[COM8] ✓ Saved:', { passengers: saved.passengers, percentage: saved.percentage, busId: saved.busId });
      } catch (err) {
        console.error('[COM8] ✗ Error saving to DB:', err.message, 'payload:', payload);
      }
    }

    lastSaveTime = Date.now();
  };

  // Periodic save interval
  setInterval(async () => {
    if (dataBuffer.length > 0) {
      await saveBufferedData();
    }
  }, intervalMs);

  parser.on('data', (line) => {
    const raw = String(line).trim();
    if (!raw) return;

    console.log('[COM8] Raw data received:', raw);

    let passengers = null;
    let percentage = null;
    let busId = defaultBusId;

    try {
      if (raw.startsWith('{')) {
        // Try JSON
        const obj = JSON.parse(raw);
        // Support both "passengers" and "count" fields (Arduino sends "count")
        if (obj.passengers != null) passengers = parseInt(obj.passengers, 10);
        else if (obj.count != null) passengers = parseInt(obj.count, 10);
        
        if (obj.percentage != null) percentage = Number(obj.percentage);
        if (obj.busId) busId = obj.busId;
      } else {
        // Extract first integer found
        const match = raw.match(/-?\d+/);
        if (match) passengers = parseInt(match[0], 10);
      }
      console.log('[COM8] Parsed:', { passengers, percentage, busId });
    } catch (err) {
      console.error('[COM8] Error parsing serial line:', err.message, 'line:', raw);
      return;
    }

    if (passengers == null) {
      console.warn('[COM8] Could not parse passenger count from serial line:', raw);
      return;
    }

    if (percentage == null) {
      if (busCapacity && Number.isFinite(busCapacity) && busCapacity > 0) {
        percentage = Math.round((passengers / busCapacity) * 100);
      } else {
        percentage = 0; // fallback (model requires percentage)
      }
    }

    if (!busId) {
      console.warn('[COM8] No busId set (set BUS_ID env or include busId in serial JSON). Using null may fail DB validation.');
    }

    const payload = { busId, passengers, percentage };
    
    // Add to buffer instead of saving immediately
    dataBuffer.push(payload);
    console.log(`[COM8] Added to buffer (buffer size: ${dataBuffer.length})`);

    // Force save if buffer gets too large (> 10 records)
    if (dataBuffer.length > 10) {
      console.log('[COM8] Buffer full (>10), saving immediately...');
      saveBufferedData();
    }
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('[COM8] Shutting down, saving remaining buffered data...');
    await saveBufferedData();
    process.exit(0);
  });
};

export default startSerialReader;
