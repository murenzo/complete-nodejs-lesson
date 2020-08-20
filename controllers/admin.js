const Product = require("../models/product");
const { response } = require("express");

exports.getAddProduct = (req, res, next) => {
  res.render(
    "admin/add-product",
    { pageTitle: "Add product", path: "/admin/add-product" },
  );
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(response => {
    res.redirect("/admin/products");
  })
  .catch(error => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const {productId} = req.params;
  Product.findByPk(productId).then(product => {
    res.render("admin/edit-product", { pageTitle: "Edit Product", path: "/admin/products", product: product});
  }).catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;
  Product.update({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  }, {
    where: {
      id: id
    }
  }).then(response => {
    res.redirect("/admin/products");
  })
  .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render(
      "admin/products",
      {
        pageTitle: "Admin Product List",
        path: "/admin/products",
        products: products,
      },
    );
  }).catch(error => console.log(error));
};

exports.deleteProduct = (req, res, next) => {
  const {productId} = req.body;
  Product.destroy({
    where: {
      id: productId
    }
  }).then(response => {
    res.redirect("/admin/products");
  }).catch(error => {
    console.log(error);
  });
}