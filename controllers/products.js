const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render(
    "admin/add-product",
    { pageTitle: "Add product", path: "/admin/add-product" },
  );
};

exports.postAddProduct = (req, res, next) => {
  const { title } = req.body;
  const product = new Product(title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll(function (products) {
    res.render(
      "shop/product-list",
      { pageTitle: "Shop", products: products, path: "/" },
    );
  });
};
