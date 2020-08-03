const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render(
    "admin/add-product",
    { pageTitle: "Add product", path: "/admin/add-product" },
  );
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render(
      "admin/products",
      {
        pageTitle: "Admin Product List",
        path: "admin/products",
        products: products,
      },
    );
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};
