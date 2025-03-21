// server.js
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const app = require('./app');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});