const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  address:   { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: true },
  pinCode:   { type: String, required: true },
  phone:     { type: String, default: '' },
  lat:       { type: Number, required: true },   // latitude for map
  lng:       { type: Number, required: true },   // longitude for map
  amenities: [{ type: String }],
  timings:   { type: String, default: '5:00 AM – 11:00 PM' },
  isActive:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Gym', gymSchema);