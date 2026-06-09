const router = require('express').Router();
const Plan = require('../models/Plan');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/plans  — PUBLIC, anyone can see plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true }).sort({ price: 1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/plans  — admin only: create a new plan
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/plans/:id  — admin only: edit a plan
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/plans/:id  — admin only: soft-delete (sets isActive=false)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Plan.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Plan deactivated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;