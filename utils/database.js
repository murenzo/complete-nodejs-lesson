const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://murenzo:Faiztech.01@cluster0.0mlio.mongodb.net/node-lesson?retryWrites=true&w=majority";

const mongoConnect = (cb) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    client.connect()
    .then(client => {
    cb(client);
    })
    .catch(error => {
        console.log(error);
    });
}

module.exports = mongoConnect;
