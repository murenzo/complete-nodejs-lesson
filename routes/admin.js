const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    activeAddProduct: true,
    formCSS: true,
    productCSS: true,
  });
});

router.post("/add-product", (req, res, next) => {
  const { title } = req.body;
  products.push({ title: title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
