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
app.use('/api/usexrs', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/tasks'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servert started at the port ${PORT}`));
