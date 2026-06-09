const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name:       { type: String, required: true },   // e.g. "PulseFit ELITE"
  tag:        { type: String, required: true },   // e.g. "ELITE"
  price:      { type: Number, required: true },   // in INR
  duration:   { type: Number, required: true },   // in days
  description:{ type: String, default: '' },
  features:   [{ type: String }],                 // list of bullet features
  color:      { type: String, default: '#f97316' },
  isActive:   { type: Boolean, default: true },
  maxMembers: { type: Number, default: null },    // null = unlimited
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);