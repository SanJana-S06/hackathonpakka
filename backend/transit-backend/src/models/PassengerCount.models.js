const mongoose = require('mongoose');

const passengerCountSchema = new mongoose.Schema({
  busId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus', 
    required: true },
  passengers: { 
    type: Number, 
    required: true },
  percentage: {
    type: Number, 
    required: true },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('PassengerCount', passengerCountSchema);