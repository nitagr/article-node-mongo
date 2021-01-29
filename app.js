const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/ArticleRouter');
const commentRoutes = require('./routes/CommentRouter');
const userRoutes = require('./routes/UserRouter');
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

module.exports = app;
