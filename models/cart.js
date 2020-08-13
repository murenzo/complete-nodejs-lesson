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
}