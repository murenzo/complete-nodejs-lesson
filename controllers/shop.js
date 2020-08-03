const Product = require("../models/product");

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
  res.render("shop/cart", { pageTitle: "Cart", path: "/cart" });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(function (products) {
    res.render(
      "shop/product-list",
      { pageTitle: "Product List", products: products, path: "/products" },
    );
  });
};
