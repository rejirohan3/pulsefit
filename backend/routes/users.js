const router = require('express').Router();
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/users/me
// Returns the currently logged-in user's profile
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

// PUT /api/users/profile
// Called after payment to save name, phone, address, etc.
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, address, pinCode, age, gender, emergencyContact } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, address, pinCode, age, gender, emergencyContact, profileComplete: true },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/members  (admin only)
// Returns all users with an active subscription — shown in admin dashboard
router.get('/members', protect, adminOnly, async (req, res) => {
  try {
    const members = await User.find({ 'subscription.status': 'active' })
      .select('-password')
      .populate('subscription.planId', 'name tag price')
      .sort({ 'subscription.startDate': -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/all  (admin only)
// Returns every registered user
router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/users/:id  (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;