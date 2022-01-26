const path = require('path');

const express = require('express');

const app = express();

//Custom middlewares
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');

//Routes
const baseRoutes = require('./routes/base-routes');
const productRoutes = require('./routes/products-routes');

//Acitvate EJS view engine
app.set('view engine', 'ejs');
app.set('views', (__dirname, 'views'));

//Parse incoming request bodies
app.use(express.urlencoded({extended: true}));
//Serve static files css,js, etc.
app.use(express.static('public'));
app.use(express.static('product-data'));

app.use(addCsrfTokenMiddleware);

app.use(baseRoutes);
app.use(productRoutes);

app.listen(3000);