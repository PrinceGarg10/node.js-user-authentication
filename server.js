const express = require('express');
require('dotenv').config();

const routes = require('./src/routes');
const { connectToDB } = require('./src/config/mongo');


const app = express();
const port = process.env.PORT || 4100;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

// Database connection
connectToDB()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Routes
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
