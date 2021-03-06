const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render(
      "shop/index",
      { pageTitle: "Shop", path: "/", products: products.slice(0, 3) },
    );
  })
  .catch(error => console.log(error));
};

// exports.getOrders = (req, res, next) => {
//   req.user.getOrders({include: ['products']})
//   .then(orders => {
//     res.render("shop/orders", { pageTitle: "Your Orders", path: "/orders", orders: orders });
//   })
//   .catch(error => console.log(error));
// };

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(products => {
      res.render("shop/cart", { pageTitle: "Cart", path: "/cart", products: products });
    })
    .catch(error => console.log(error));
};

exports.postCart = (req, res, next) => {
  const {productId} = req.body;
  Product.findById(productId)
  .then(product => {
    return req.user.addToCart(product)
  })
  .then(result => {
    res.redirect('cart')
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
  Product.fetchAll()
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
  Product.findById(productId)
  .then(product => {
    res.render("shop/product-detail", { pageTitle: product.title, product: product, path: "/products"});
  })
  .catch(error => console.log(error));
  // Product.findByPk(productId).then(product => {
  //   res.render("shop/product-detail", { pageTitle: product.title, product: product, path: "/products"});
  // })
  // .catch(error => console.log(error));
}

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user.getCart()
//   .then(cart => {
//     fetchedCart = cart;
//     return cart.getProducts();
//   })
//   .then(products => {
//     return req.user.createOrder()
//     .then(order => {
//       return order.addProducts(products.map(product => {
//         product.orderItem = {quantity: product.cartItem.quantity}
//         return product;
//       }))
//     })
//     .catch(error => console.log(error));
//   })
//   .then(result => {
//     return fetchedCart.setProducts(null);
//   })
//   .then(result => {
//     res.redirect("/orders");
//   })
//   .catch(error => console.log(error));
//   console.log("Creating Order");
// }
