const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'carts.json');

module.exports = class Cart {

    static addProduct(id, productPrice) {
        
        fs.readFile(p, (err, fileContents) => {
            let cart = {products: [], priceTotal: 0};
            if(!err) {
                cart = JSON.parse(fileContents);
            }
        
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct, qty: existingProduct.qty + 1};
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.priceTotal = cart.priceTotal + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if(err) {
                    console.log(err);
                }
            })
        })
    }

    static deleteProduct(id, productPrice, cb) {
        fs.readFile(p, (err, fileContents) => {
            if(err) {
                console.log("Error happened inside Cart delete product function");
                return;
            }
            const cartContents = JSON.parse(fileContents);

            const product = cartContents.products.find(prod => prod.id === id);

            if(!product) {
                return cb();
            }

            const productQty = product.qty;

            cartContents.products = cartContents.products.filter(prod => prod.id !== id);

            cartContents.priceTotal = cartContents.priceTotal - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(cartContents), err => {
                if(err) {
                    console.log(err);
                }

                cb();
            });

        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContents) => {
            if (err) {
                cb(null)
            } else {
                const cart = JSON.parse(fileContents);
                cb(cart);
            }
        });
    }


}