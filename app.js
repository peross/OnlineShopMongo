const path = require('path');

const express = require('express');

const db = require('./data/database');

let port = 3000;

if(process.env.PORT){
    port = process.env.PORT;
}

const app = express();

//Custom middlewares
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const notFoundMiddleware = require('./middlewares/not-found');

//Routes
const baseRoutes = require('./routes/base-routes');
const productRoutes = require('./routes/products-routes');
const authRoutes = require('./routes/auth-routes');

//Acitvate EJS view engine
app.set('view engine', 'ejs');
app.set('views', (__dirname, 'views'));

//Parse incoming request 
app.use(express.urlencoded({extended: true}));
//Serve static files css,js, etc.
app.use(express.static('public'));
app.use(express.static('product-data'));

app.use(addCsrfTokenMiddleware);

app.use(baseRoutes);
app.use(productRoutes);
app.use(authRoutes);

app.use(notFoundMiddleware);

db.connectToDatabase().then(() => {
    app.listen(port);
}).catch((error) => {
    console.log('Failed to connect to the database!');
    console.log(error);
});