const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render(
    "admin/add-product",
    { pageTitle: "Add product", path: "/admin/add-product" },
  );
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save()
  .then(result => {
    res.redirect("/admin/add-product");
  })
  .catch(error => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const {productId} = req.params;
  Product.findById(productId)
  .then(product => {
    
    if(! product) {
      return res.redirect("/admin/products");
    }

    res.render("admin/edit-product", { pageTitle: "Edit Product", path: "/admin/products", product: product});
  })
  .catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const { _id, title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description, _id);
  product.save()
  .then(response => {
    res.redirect("/admin/products");
  })
  .catch(error => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
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

// exports.deleteProduct = (req, res, next) => {
//   const {productId} = req.body;
//   Product.destroy({
//     where: {
//       id: productId
//     }
//   }).then(response => {
//     res.redirect("/admin/products");
//   }).catch(error => {
//     console.log(error);
//   });
// }