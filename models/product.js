const {getDb} = require("../utils/database");
const { get } = require("../routes/admin");

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    db.collection('products').insertOne(this)
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }
}

module.exports = Product;