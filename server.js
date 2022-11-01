require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./src/routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})