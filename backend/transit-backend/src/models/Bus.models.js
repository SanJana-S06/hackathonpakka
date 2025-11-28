const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  route: { 
    type: String, 
    required: true 
  },
  Status: { 
    type: String, 
    enum: ['On Time', 'Delayed', 'No Data'], 
    default: 'No Data' 
  }
});

module.exports = mongoose.model('Bus', busSchema);