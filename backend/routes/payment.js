const router = require('express').Router();
const User = require('../models/User');
const Plan = require('../models/Plan');
const { protect } = require('../middleware/auth');

// POST /api/payment/create-order
// Just returns a fake order — no real payment gateway
router.post('/create-order', protect, async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    // Fake order object
    const fakeOrder = {
      id: `fake_order_${Date.now()}`,
      amount: plan.price * 100,
      currency: 'INR',
    };

    res.json({ order: fakeOrder, plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/payment/verify
// Skips all verification — just activates the subscription directly
router.post('/verify', protect, async (req, res) => {
  try {
    const { planId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        subscription: {
          planId: plan._id,
          planName: plan.name,
          status: 'active',
          startDate,
          endDate,
          razorpayOrderId: `demo_order_${Date.now()}`,
          razorpayPaymentId: `demo_pay_${Date.now()}`,
        }
      },
      { new: true }
    ).select('-password');

    res.json({ message: 'Payment successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;