const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Property = require('./models/Property');
const Booking = require('./models/Booking');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await User.deleteMany();
    await Property.deleteMany();
    await Booking.deleteMany();
    console.log('Cleared existing data');

    // Create users
    const salt = await bcrypt.genSalt(10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@househunt.com',
      password: 'admin123',
      role: 'admin'
    });

    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'user'
    });

    const landlord = await User.create({
      name: 'Mike Wilson',
      email: 'mike@example.com',
      password: 'password123',
      role: 'user'
    });

    console.log('Users created');

    // Create properties
    const properties = await Property.insertMany([
      {
        title: 'Modern Downtown Apartment',
        description: 'A beautiful modern apartment in the heart of downtown with stunning city views. Fully furnished with premium appliances.',
        location: 'New York, NY',
        price: 2500,
        type: 'apartment',
        amenities: ['WiFi', 'Parking', 'Gym', 'Laundry', 'AC'],
        owner: landlord._id,
        approved: true
      },
      {
        title: 'Cozy Studio Near University',
        description: 'Perfect studio apartment for students or young professionals. Walking distance to public transport.',
        location: 'Boston, MA',
        price: 1200,
        type: 'studio',
        amenities: ['WiFi', 'Heating', 'Laundry'],
        owner: landlord._id,
        approved: true
      },
      {
        title: 'Spacious Family House',
        description: 'Large 4-bedroom house with a garden, perfect for families. Quiet neighborhood with excellent schools nearby.',
        location: 'Austin, TX',
        price: 3200,
        type: 'house',
        amenities: ['Parking', 'Garden', 'AC', 'Heating', 'Pet Friendly'],
        owner: admin._id,
        approved: true
      },
      {
        title: 'Luxury Villa with Pool',
        description: 'Stunning luxury villa featuring a private pool, home theater, and smart home technology.',
        location: 'Miami, FL',
        price: 8500,
        type: 'villa',
        amenities: ['Pool', 'Gym', 'Smart Home', 'Security', 'Parking', 'AC'],
        owner: landlord._id,
        approved: true
      },
      {
        title: 'Downtown Condo with View',
        description: 'High-rise condo on the 25th floor with panoramic city views. Modern kitchen and luxury finishes.',
        location: 'Chicago, IL',
        price: 3800,
        type: 'condo',
        amenities: ['Concierge', 'Gym', 'Parking', 'Rooftop', 'AC'],
        owner: admin._id,
        approved: true
      },
      {
        title: 'Budget Friendly Studio',
        description: 'Affordable studio apartment with all essentials. Great for young professionals.',
        location: 'Portland, OR',
        price: 900,
        type: 'studio',
        amenities: ['WiFi', 'Laundry'],
        owner: user2._id,
        approved: true
      },
      {
        title: 'Suburban 3-Bedroom House',
        description: 'Comfortable house in a safe suburb. Newly renovated with modern kitchen and bathrooms.',
        location: 'Seattle, WA',
        price: 2800,
        type: 'house',
        amenities: ['Garage', 'Garden', 'AC', 'WiFi'],
        owner: user2._id,
        approved: false
      },
      {
        title: 'Beachfront Apartment',
        description: 'Wake up to ocean views in this stunning beachfront apartment. Steps from the sand.',
        location: 'Los Angeles, CA',
        price: 4200,
        type: 'apartment',
        amenities: ['Beach Access', 'Pool', 'AC', 'Parking'],
        owner: landlord._id,
        approved: false
      }
    ]);

    console.log('Properties created');

    // Create bookings
    await Booking.insertMany([
      {
        user: user1._id,
        property: properties[0]._id,
        bookingDate: new Date('2024-02-15'),
        status: 'confirmed',
        message: 'Looking forward to moving in!'
      },
      {
        user: user1._id,
        property: properties[2]._id,
        bookingDate: new Date('2024-03-01'),
        status: 'pending',
        message: 'Is the house pet-friendly?'
      },
      {
        user: user2._id,
        property: properties[1]._id,
        bookingDate: new Date('2024-02-20'),
        status: 'confirmed',
        message: 'I am a graduate student'
      }
    ]);

    console.log('Bookings created');
    console.log('\n✅ Seed data inserted successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('Admin: admin@househunt.com / admin123');
    console.log('User1: john@example.com / password123');
    console.log('User2: jane@example.com / password123');
    console.log('Landlord: mike@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
