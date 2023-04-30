const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
// settings
app.set('port', PORT || 4000);
// middlewares
app.use(cors());
app.use(express.json());
// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));
module.exports = app;
