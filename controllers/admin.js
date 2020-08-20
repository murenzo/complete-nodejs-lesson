const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render(
    "admin/add-product",
    { pageTitle: "Add product", path: "/admin/add-product" },
  );
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save()
  .then(() => {
    res.redirect("/");
  })
  .catch(error => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const {productId} = req.params;
  Product.findById(productId, product => {
    res.render("admin/edit-product", { pageTitle: "Edit Product", path: "/admin/products", product: product});
  });
};

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = req.body;
  const product = new Product(id, title, imageUrl, description, price);
  product.update();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render(
      "admin/products",
      {
        pageTitle: "Admin Product List",
        path: "/admin/products",
        products: products,
      },
    );
  });
};

exports.deleteProduct = (req, res, next) => {
  const {productId} = req.body;
  Product.deleteProduct(productId, function() {
    res.redirect("/admin/products");
  });
}