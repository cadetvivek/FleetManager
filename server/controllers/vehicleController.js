const Vehicle = require('../models/vehicleModel');

// Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new vehicle
const createVehicle = async (req, res) => {
  const { 
    make, model, year, licensePlate, status, type, mileage, image, 
    location, fuelType, fuelEfficiency, lastMaintenance, nextMaintenance, assignedDriver 
  } = req.body;

  try {
    const vehicle = new Vehicle({
      make, model, year, licensePlate, status, type, mileage, image, 
      location, fuelType, fuelEfficiency, lastMaintenance, nextMaintenance, assignedDriver
    });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getVehicles, createVehicle };