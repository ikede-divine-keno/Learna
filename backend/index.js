// Importing dotenv to load environment variables from a .env file
require('dotenv').config();

// Importing the connectDB function from the database configuration file
const connectDB = require('./config/database');

// Importing the Express application instance from the Express configuration file
const app = require('./config/express');

// Importing the statsRoutes from the routes directory
const statsRoutes = require('./routes/index');

// Connect to MongoDB by calling the connectDB function
connectDB();

// Using the statsRoutes for handling requests at the '/api/stats' endpoint
app.use('/api/stats', statsRoutes);

// Defining the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Starting the Express server and listening on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
