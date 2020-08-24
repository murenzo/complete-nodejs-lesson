const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render(
      "shop/index",
      { pageTitle: "Shop", path: "/", products: products.slice(0, 3) },
    );
  })
  .catch(error => console.log(error));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { pageTitle: "Your Orders", path: "orders" });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().
  then(cart => {
    return cart.getProducts()
    .then(products => {
      res.render("shop/cart", { pageTitle: "Cart", path: "/cart", products: products });
    })
    .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
};

exports.postCart = (req, res, next) => {
  const {productId} = req.body;
  Product.findById(productId, product => {
    const {id, price} = product;
    Cart.addProduct(id, price);
    res.redirect("/cart");
  })
  
}

exports.postCartItemDelete = (req, res, next) => {
  const {productId, productPrice} = req.body;
  console.log(productId, productPrice);
  Cart.deleteProduct(productId, productPrice, function() {
    return res.redirect("/cart");
  });
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render(
      "shop/product-list",
      { pageTitle: "Product List", products: products, path: "/products" },
    )
  })
  .catch(error => console.log(error));
};

exports.getProduct = (req, res, next) => {
  const {productId} = req.params;
  Product.findByPk(productId).then(product => {
    res.render("shop/product-detail", { pageTitle: product.title, product: product, path: "/products"});
  })
  .catch(error => console.log(error));
}
