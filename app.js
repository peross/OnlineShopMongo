const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const db = require('./data/database');

let port = 3000;

if(process.env.PORT){
    port = process.env.PORT;
}

const app = express();

const createSessionConfig = require('./config/session');

//Custom middlewares
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');

//Routes
const baseRoutes = require('./routes/base-routes');
const productRoutes = require('./routes/products-routes');
const authRoutes = require('./routes/auth-routes');

//Acitvate EJS view engine
app.set('view engine', 'ejs');
app.set('views', (__dirname, 'views'));

//Parse incoming request 
app.use(express.urlencoded({extended: false}));
app.use(express.json()); //ajax request
//Serve static files css,js, etc.
app.use(express.static('public'));
app.use(express.static('product-data'));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.connectToDatabase().then(() => {
    app.listen(port);
}).catch((error) => {
    console.log('Failed to connect to the database!');
    console.log(error);
});