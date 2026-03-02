const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');

// @desc Get all users
// @route GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete user
// @route DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all properties (including unapproved)
// @route GET /api/admin/properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Approve property
// @route PUT /api/admin/properties/:id/approve
const approveProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    property.approved = true;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete property (admin)
// @route DELETE /api/admin/properties/:id
const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all bookings
// @route GET /api/admin/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('property', 'title location price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get dashboard stats
// @route GET /api/admin/stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProperties = await Property.countDocuments();
    const pendingProperties = await Property.countDocuments({ approved: false });
    const totalBookings = await Booking.countDocuments();
    res.json({ totalUsers, totalProperties, pendingProperties, totalBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, getAllProperties, approveProperty, deleteProperty, getAllBookings, getDashboardStats };
