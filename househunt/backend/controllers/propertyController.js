const Property = require('../models/Property');

// @desc Get approved properties (with filters)
// @route GET /api/properties
const getProperties = async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice, search } = req.query;
    const query = { approved: true };

    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = type;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) query.title = { $regex: search, $options: 'i' };

    const properties = await Property.find(query).populate('owner', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single property
// @route GET /api/properties/:id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create property
// @route POST /api/properties
const createProperty = async (req, res) => {
  try {
    const { title, description, location, price, type, amenities } = req.body;
    const property = await Property.create({
      title, description, location, price, type,
      amenities: amenities || [],
      owner: req.user._id,
      approved: false
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get my properties
// @route GET /api/properties/my
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete property (owner)
// @route DELETE /api/properties/:id
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await property.deleteOne();
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProperties, getPropertyById, createProperty, getMyProperties, deleteProperty };
