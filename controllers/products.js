const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render(
    "add-product",
    { pageTitle: "Add product", path: "/admin/add-product" },
  );
};

exports.postAddProduct = (req, res, next) => {
  const { title } = req.body;
  products.push({ title: title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", { pageTitle: "Shop", products: products, path: "/" });
};
