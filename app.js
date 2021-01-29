const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// connecting to database

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.URL, connectionParams)
  .then(() => {
    console.log('Connected to database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

module.exports = app;
