const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;
let mongodbUri = 'mongodb://localhost:27017';

if(process.env.MONGODB_URI){
    mongodbUri = process.env.MONGODB_URI;
}

async function connectToDatabase(){
    const client = await MongoClient.connect(mongodbUri);
    database = client.db('shop');
}

function getDb(){
    if(!database){
        throw new Error('You must connect first!');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb,
}