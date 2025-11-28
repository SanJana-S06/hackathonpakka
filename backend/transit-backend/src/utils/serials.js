const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

// Load MongoDB URL from .env
const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

const port = new SerialPort({ path: "COM8", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// Send busId to Arduino
async function sendBusIdToArduino(busObjectId) {
  const client = new MongoClient(mongoURL);
  await client.connect();

  const bus = await client
    .db(dbName)
    .collection("buses")
    .findOne({ _id: new ObjectId(busObjectId) });

  if (!bus) {
    console.log("❌ Bus not found");
    return;
  }

  const busId = bus._id.toString();
  const startCount = bus.count || 0;

  const message = `busId:${busId},count:${startCount}\n`;
  port.write(message);

  console.log("➡️ Sent to Arduino:", message);

  await client.close();
}

// Read JSON coming from Arduino
parser.on("data", async (line) => {
  try {
    const json = JSON.parse(line);

    const client = new MongoClient(mongoURL);
    await client.connect();

    await client
      .db(dbName)
      .collection("busCounts")
      .insertOne(json);

    await client.close();

    console.log("⬅️ Saved to DB:", json);
  } catch (err) {
    console.log("Invalid JSON:", line);
  }
});

module.exports = { sendBusIdToArduino };
