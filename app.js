const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Article = require('./models/article');
const ArticleRoutes = require('./routes/ArticleRouter');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app =  express();

app.use(cookieParser());

mongoose.connect('mongodb://localhost/blogg',{
    useNewUrlParser: true, useUnifiedTopology: true
});
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/articles', ArticleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server started on PORT ${PORT}`);
})

