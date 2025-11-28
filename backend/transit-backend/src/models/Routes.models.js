const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  busId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bus', 
    required: true },
  stops: [{ type: String }],
});

module.exports = mongoose.model('Route', routeSchema);