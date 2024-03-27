// Importing the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Defining an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempting to establish a connection with the MongoDB server
    await mongoose.connect('mongodb://localhost:27017/learna');
    // Logging a success message if the connection is established
    console.log('MongoDB connected');
  } catch (err) {
    // Handling any errors that occur during the connection process
    console.error(err.message);
    // Exiting the Node.js process with an error code if connection fails
    process.exit(1);
  }
};

// Exporting the connectDB function to make it accessible from other modules
module.exports = connectDB;
