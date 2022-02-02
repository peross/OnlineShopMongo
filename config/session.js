const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore(){
    const MongoDBStore = mongoDbStore(expressSession);

    let mongodbUri = 'mongodb://localhost:27017';

    if(process.env.MONGODB_URI){
        mongodbUri = process.env.MONGODB_URI;
    }

    const store = new MongoDBStore({
        uri: mongodbUri,
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store;
}

function createSessionConfig(){
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
           maxAge: null //2*24*60*60*1000, //2 days in milliseconds
        }
    }
}

module.exports = createSessionConfig;