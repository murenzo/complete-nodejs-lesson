const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHandlebars = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  expressHandlebars({
    extname: "hbs",
    defaultLayout: false,
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

//Handles 404 request
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});
app.listen(3500);
