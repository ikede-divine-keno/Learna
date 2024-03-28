// Importing
// dotenv to load environment variables from a .env file
require('dotenv').config();
// the connectDB function from the database configuration file
const connectDB = require('./config/database');
// the Express application instance from the Express configuration file
const app = require('./config/express');
// the statsRoutes from the routes directory
const statsRoutes = require('./routes/index');
// the authRoutes from the routes directory
const authController = require('./routes/authRoutes');
// the userRoutes from the routes directory
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB by calling the connectDB function
connectDB();

// Routes
// for handling requests at the '/api/stats' endpoint
app.use('/api/stats', statsRoutes);

// for handling requests at the '/api/auth' endpoint
app.use('/api/auth', authController);

app.use('/api/user', userRoutes);

// Defining the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Starting the Express server and listening on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
