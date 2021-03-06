// Loading libraries
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
require('dotenv').config();

//connect to Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => {
	res.json({ msg: 'Welcome to Daytrack WebApp API!' });
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/entries', require('./routes/entries'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started at the port ${PORT}`));
