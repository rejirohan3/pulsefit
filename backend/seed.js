// HOW TO USE: In terminal inside backend/ folder, run:  node seed.js
// Run this ONCE to create admin + 3 plans + 3 gyms in your database

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Plan = require('./models/Plan');
const Gym  = require('./models/Gym');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // ── Admin user ──────────────────────────────────────────────────────────
  const existingAdmin = await User.findOne({ email: 'admin@pulsefit.in' });
  if (!existingAdmin) {
    await User.create({
      name: 'PulseFit Admin',
      email: 'admin@pulsefit.in',
      password: 'admin123',       // User model auto-hashes this
      role: 'admin',
      profileComplete: true,
    });
    console.log('✅ Admin → admin@pulsefit.in  /  admin123');
  } else {
    console.log('ℹ️  Admin already exists');
  }

  // ── Default plans ────────────────────────────────────────────────────────
  const plans = [
    {
      name: 'PulseFit ELITE', tag: 'ELITE', price: 2999, duration: 30,
      description: 'Unlimited access to group classes, all gyms, and at-home workouts',
      features: ['Unlimited gym visits', 'All group classes', '50+ locations', 'At-home workout app', 'Priority booking'],
      color: '#f97316',
    },
    {
      name: 'PulseFit PRO', tag: 'PRO', price: 1999, duration: 30,
      description: 'Unlimited access to all PRO gyms and at-home workouts',
      features: ['Unlimited PRO gym visits', 'At-home workout app', '30+ PRO locations', 'Online classes'],
      color: '#8b5cf6',
    },
    {
      name: 'PulseFit SELECT', tag: 'SELECT', price: 999, duration: 30,
      description: 'Unlimited access to single centre and at-home workouts',
      features: ['Unlimited single centre access', 'At-home workout app', 'Online classes'],
      color: '#14b8a6',
    },
  ];

  for (const p of plans) {
    const exists = await Plan.findOne({ tag: p.tag });
    if (!exists) { await Plan.create(p); console.log(`✅ Plan: ${p.tag}`); }
    else console.log(`ℹ️  Plan ${p.tag} already exists`);
  }

  // ── Sample gyms ──────────────────────────────────────────────────────────
  const gyms = [
    {
      name: 'PulseFit Connaught Place',
      address: 'N-Block, Connaught Place', city: 'New Delhi', state: 'Delhi', pinCode: '110001',
      lat: 28.6315, lng: 77.2167, timings: '5:00 AM – 11:00 PM',
      amenities: ['Pool', 'Sauna', 'Parking'],
    },
    {
      name: 'PulseFit Janakpuri',
      address: 'B-1/638, Janakpuri', city: 'New Delhi', state: 'Delhi', pinCode: '110058',
      lat: 28.6219, lng: 77.0878, timings: '5:30 AM – 10:30 PM',
      amenities: ['Parking', 'Locker'],
    },
    {
      name: 'PulseFit Rohini Sector-3',
      address: 'Pocket 3, Rohini', city: 'New Delhi', state: 'Delhi', pinCode: '110085',
      lat: 28.7041, lng: 77.1025, timings: '5:00 AM – 11:00 PM',
      amenities: ['Parking', 'Sauna', 'Cafe'],
    },
  ];

  for (const g of gyms) {
    const exists = await Gym.findOne({ name: g.name });
    if (!exists) { await Gym.create(g); console.log(`✅ Gym: ${g.name}`); }
  }

  console.log('\n🎉 Done! You can now run: npm run dev');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });