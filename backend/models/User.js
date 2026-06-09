const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:             { type: String, required: true, trim: true },
  email:            { type: String, required: true, unique: true, lowercase: true },
  password:         { type: String, required: true, minlength: 6 },
  phone:            { type: String, default: '' },
  address:          { type: String, default: '' },
  pinCode:          { type: String, default: '' },
  age:              { type: Number, default: null },
  gender:           { type: String, enum: ['Male', 'Female', 'Other', ''], default: '' },
  emergencyContact: { type: String, default: '' },
  role:             { type: String, enum: ['user', 'admin'], default: 'user' },
  subscription: {
    planId:           { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', default: null },
    planName:         { type: String, default: '' },
    status:           { type: String, enum: ['active', 'expired', 'none'], default: 'none' },
    startDate:        { type: Date, default: null },
    endDate:          { type: Date, default: null },
    razorpayOrderId:  { type: String, default: '' },
    razorpayPaymentId:{ type: String, default: '' },
  },
  profileComplete: { type: Boolean, default: false },
}, { timestamps: true });

// Auto-hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);