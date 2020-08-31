const { ObjectId } = require("mongodb");

const {getDb} = require("../utils/database");

class User {
    constructor(username , email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection("users").insertOne(this)
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }

    addToCart(product) {
        const productIndex = this.cart.items.findIndex(cartProduct => {
            return cartProduct.productId.toString() === product._id.toString();
        });

        let newQuantity = 1;

        const existingCartItems = [...this.cart.items];

        if(productIndex >= 0) {
            newQuantity = existingCartItems[productIndex].quantity + 1;
            existingCartItems[productIndex].quantity = newQuantity;
        } else {
            existingCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity})
        }

        const updatedCart = { items: existingCartItems };
        const db = getDb();
        return db.collection("users")
        .updateOne({ _id: new ObjectId(this._id)}, { $set: { cart: updatedCart }});
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
