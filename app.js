const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/school.routes');
const app = express();

app.use(bodyParser.json());
app.use('/api', schoolRoutes);

module.exports = app;
