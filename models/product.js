const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json",
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  update() {
    getProductsFromFile( products => {
      const existingProductIndex = products.findIndex(product => product.id === this.id);
      if (existingProductIndex) {
        products[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(products), err => {
          if (err) {
            console.log(err);
          }
        })  
      }
    })
  }

  static deleteProduct(id, cb) {
    getProductsFromFile(products => {
      const productIndex = products.findIndex(product => product.id === id);
      if (productIndex >= 0) {
        const product = products[productIndex];
        products.splice(productIndex, 1);
        fs.writeFile(p, JSON.stringify(products), err => {
          if(!err) {
            Cart.deleteProduct(id, product.price, cb);
          }
        });
      }
    });
  };

  static fetchAll(cb) {
    getProductsFromFile(cb);
  };

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id === id);
      cb(product);
    });
  };
};
