const express = require("express");
const router = express.Router();
const { sendBusIdToArduino } = require("../utils/serial");

router.post("/send-bus-id/:id", async (req, res) => {
  const busId = req.params.id;
  await sendBusIdToArduino(busId);
  res.json({ message: "Bus ID sent to Arduino" });
});

module.exports = router;
