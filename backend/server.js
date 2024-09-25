const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const mongoURI = require('./config/mongodb');

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tenants', require('./routes/tenantRoutes'));
app.use('/api/houses', require('./routes/houseRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));