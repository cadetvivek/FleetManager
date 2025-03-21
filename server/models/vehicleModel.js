const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['active', 'maintenance', 'inactive'], 
    default: 'active' 
  },
  type: { type: String, required: true },
  mileage: { type: Number, default: 0 },
  image: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  fuelType: { type: String },
  fuelEfficiency: { type: Number },
  lastMaintenance: { type: Date },
  nextMaintenance: { type: Date },
  assignedDriver: { type: String } // Assuming this is a string ID or name for simplicity
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;