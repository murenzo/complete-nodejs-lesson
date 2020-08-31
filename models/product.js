const mongodb = require("mongodb");

const {getDb} = require("../utils/database");

class Product {
  constructor(title, imageUrl, price, description, id, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOps;

    if(this._id) {
      dbOps = db.collection("products")
      .updateOne({_id: this._id}, {$set: this})
    } else {
      dbOps = db.collection("products")
      .insertOne(this);
    }
    return dbOps
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray()
    .then(prodcuts => {
      return prodcuts;
    })
    .catch(error => console.log(error));
  }

  static findById(id) {
    const db = getDb();
    return db.collection("products").find({ _id: new mongodb.ObjectId(id) }).next()
    .then(product => {
      return product;
    })
    .catch(error => console.log(error));
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection("products").deleteOne({ _id: new mongodb.ObjectId(id) })
    .then(response => console.log("Deleted"))
    .catch(error => console.log(error));
  }
}

module.exports = Product;