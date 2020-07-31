const path = require("path");

const express = require("express");

const adminRoutes = require("../controllers/products");

const router = express.Router();

router.get("/", adminRoutes.getProducts);

module.exports = router;
