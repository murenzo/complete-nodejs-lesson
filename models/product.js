const Cart = require("./cart");
const db = require("../utils/database");


module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute("insert into products (title, price, description, imageUrl) values(?, ?, ?, ?)", 
    [this.title, this.price, this.description, this.imageUrl]);
  }

  update() {
    
  }

  static deleteProduct(id, cb) {
    
  };

  static fetchAll() {
    return db.execute("select * from products");
  };

  static findById(id) {
    return db.execute("select * from products where id = ?", [id]);
  };
};
