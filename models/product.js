const {getDb} = require("../utils/database");

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db.collection("products").insertOne(this)
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("products").find().toArray()
    .then(prodcuts => {
      console.log(prodcuts);
      return prodcuts;
    })
    .catch(error => console.log(error));
  }
}

module.exports = Product;