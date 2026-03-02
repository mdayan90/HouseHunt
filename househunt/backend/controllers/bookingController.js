const Booking = require('../models/Booking');
const Property = require('../models/Property');

// @desc Create booking
// @route POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { propertyId, bookingDate, message } = req.body;
    const property = await Property.findById(propertyId);
    if (!property || !property.approved) {
      return res.status(400).json({ message: 'Property not available for booking' });
    }
    const booking = await Booking.create({
      user: req.user._id,
      property: propertyId,
      bookingDate,
      message
    });
    await booking.populate(['user', 'property']);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get my bookings
// @route GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('property', 'title location price type')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Cancel booking
// @route PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, cancelBooking };
