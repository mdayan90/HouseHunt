const express = require('express');
const router = express.Router();
const {
  getAllUsers, deleteUser, getAllProperties, approveProperty,
  deleteProperty, getAllBookings, getDashboardStats
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/properties', getAllProperties);
router.put('/properties/:id/approve', approveProperty);
router.delete('/properties/:id', deleteProperty);
router.get('/bookings', getAllBookings);

module.exports = router;
