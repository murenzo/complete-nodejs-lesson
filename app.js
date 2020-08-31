const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const {mongoConnect} = require("./utils/database");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findById("5f4cfc1b6747956f8e14424a")
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => console.log(error));
    // next();
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.getPageNotFound);

mongoConnect(() => {
    app.listen(3500);
})
