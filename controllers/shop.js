const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render(
      "shop/index",
      { pageTitle: "Shop", path: "/", products: products.slice(0, 3) },
    );
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Your Orders", path: "orders" });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];

      for(product of products) {
        const cartProductIndex = cart.products.findIndex(prod => prod.id === product.id);
        if(cartProductIndex >= 0) {
          cartProducts.push({data: product, quantity: cart.products[cartProductIndex].qty});
        }
      }
      res.render("shop/cart", { pageTitle: "Cart", path: "/cart", products: cartProducts });
    })
  })
};

exports.postCart = (req, res, next) => {
  const {productId} = req.body;
  Product.findById(productId, product => {
    const {id, price} = product;
    Cart.addProduct(id, price);
    res.redirect("/cart");
  })
  
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(function(products) {
    res.render(
      "shop/product-list",
      { pageTitle: "Product List", products: products, path: "/products" },
    );
  });
};

exports.getProduct = (req, res, next) => {
  const {productId} = req.params;
  Product.findById(productId, function(product) {
    res.render("shop/product-detail", { pageTitle: product.title, product: product , path: "/products"});
  });
}
