const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const cors = require('cors');

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(cors());

// DB Config
const db = config.get('mongoURI');
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//ROUTES
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/ads', require('./routes/api/ads'));

const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`Server started on port ${port}`));