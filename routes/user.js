var express = require("express");
var router = express.Router();
var productHelpers = require("../setUps/products-help");
var userHelpers = require("../setUps/user-Details");
var LoginVerify = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};
router.get("/", function (req, res, next) {
  console.log(req.session);
  let user = req.session.user;
  console.log(user, "<-------------------------user_Session-----");
  productHelpers.getAllproducts().then((products) => {
    res.render("users/home.hbs", { products, user }); // Display ALl Products in Home Page
  });
});
router.get("/signup", (req, res) => {
  res.render("users/signup");
});
router.post("/signup", (req, res) => {
  userHelpers.onSignup(req.body).then((response) => {
    console.log("Sign up Succeful");
    req.session.loggedIn = true;
    req.session.user = response;
    res.redirect("/");
  });
});
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("users/login", { loggedErr: req.session.loggedErr });
  }
});
router.post("/login", (req, res) => {
  userHelpers.onLogin(req.body).then(({ user, status }) => {
    if (status) {
      // console.log('>>>>>>>>> logged');
      req.session.loggedIn = true;
      req.session.user = user;
      // console.log({session:req.session.user});
      res.redirect("/");
    } else {
      req.session.loggedErr = "Login Failed and Please Try Again";
      res.redirect("/login");
    }
  });
});
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});
router.get("/cart", LoginVerify, (req, res) => {
  userHelpers.getCartProduct(req.session.user._id);
  res.render("users/cart", { user: req.session.user });
});
router.get("/Add-to-cart/:id", LoginVerify, (req, res) => {
  userHelpers.addToCart(req.params.id, req.session.user._id).then(() => {
    res.redirect("/");
  });
});
module.exports = router;
