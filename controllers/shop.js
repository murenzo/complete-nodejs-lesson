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
  let newQuantity = 1;
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: productId}})
    .then(products => {
      let product;

      if(products.length > 0) {
        product = products[0];
      }

      if(product) {
        oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(productId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
    })
    .catch(error => console.log(error));
  })
  .then(() => {
    res.redirect("/cart");
  })
  .catch(error => console.log(error));
}

exports.postCartItemDelete = (req, res, next) => {
  const {productId} = req.body;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where: {id: productId}})
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(result => {
    res.redirect("/cart");
  })
  .catch(error => console.log(error))
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
