const mongodb = require("mongodb");

const {getDb} = require("../utils/database");

class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOps;

    if(this._id) {
      dbOps = db.collection("products")
      .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {title: this.title, imageUrl: this.imageUrl, price: this.price, description: this.description}})
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
      console.log(product)
      return product;
    })
    .catch(error => console.log(error));
  }
}

module.exports = Product;