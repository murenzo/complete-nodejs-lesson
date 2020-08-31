const { ObjectId } = require("mongodb");

const {getDb} = require("../utils/database");

class User {
    constructor(username , email) {
        this.username = username;
        this.email = email;
    }

    save() {
        const db = getDb();
        return db.collection("users").insertOne(this)
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }

    static findById(userId) {
        const db = getDb();
        return db.collection("users").findOne({ _id: new ObjectId(userId) })
        .then(user => {
            return user;
        })
        .catch(error => console.log(error));
    }
}

module.exports = User;
