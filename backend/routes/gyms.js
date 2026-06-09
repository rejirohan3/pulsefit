const router = require('express').Router();
const Gym = require('../models/Gym');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/gyms  — PUBLIC
// Optional query: /api/gyms?city=Delhi
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    const filter = { isActive: true };
    if (city) filter.city = new RegExp(city, 'i'); // case-insensitive search
    const gyms = await Gym.find(filter);
    res.json(gyms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/gyms  — admin only: add a new gym location
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const gym = await Gym.create(req.body);
    res.status(201).json(gym);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/gyms/:id  — admin only: update gym details
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const gym = await Gym.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(gym);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/gyms/:id  — admin only: permanently remove
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Gym.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gym removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;