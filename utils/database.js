const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://murenzo:Faiztech.01@cluster0.0mlio.mongodb.net/node-lesson?retryWrites=true&w=majority";

let _db;

const mongoConnect = (cb) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    client.connect()
    .then(client => {
        _db = client.db();
        cb();
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw "No Database Found."
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
