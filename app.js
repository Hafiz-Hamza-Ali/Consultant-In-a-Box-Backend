const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectdb.js');
const userRoutes = require('./routes/userRoutes.js');
const path = require('path');

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS Policy
app.use(cors());

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Load Routes
app.use("/api/user", userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

// Route for serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
