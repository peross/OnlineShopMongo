const path = require('path');

const express = require('express');

const app = express();

//Routes
const baseRoutes = require('./routes/base-routes');

//Acitvate EJS view engine
app.set('view engine', 'ejs');
app.set('views', (__dirname, 'views'));

//Parse incoming request bodies
app.use(express.urlencoded({extended: true}));
//Serve static files css,js, etc.
app.use(express.static('public'));

app.use(baseRoutes);

app.listen(3000);