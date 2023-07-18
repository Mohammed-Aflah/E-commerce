var express = require("express");
var router = express.Router();
var productHelpers = require("../setUps/products-help");
/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelpers.getAllproducts().then((products) => {
    res.render("../views/admin/list_product", { products, admin: true });
  });
});
router.get("/Add-product", (req, res) => {
  res.render("../views/admin/add_product.hbs", { admin: true });
});
router.post("/Add-product", (req, res) => {
  req.body.Price = parseInt(req.body.Price);
  productHelpers
    .addProdcut(req.body)
    .then((id) => {
      img.mv("./public/images/Shopping-Images/" + id + ".jpg", (err) => {
        if (err) {
          console.log("erro Occured on Inserting Image" + err);
          return;
        }
        res.redirect("/admin/Add-product");
      });
    })
    .catch((err) => console.log("Error Ocured on Add product"));
  let img = req.files.Image;
});
router.get("/delete-product/:id", (req, res) => {
  productHelpers.deleteProductFromAdminList(req.params.id).then((response) => {
    console.log(response);
    res.redirect("/admin");
  });

  // console.log(req.params.id);
});
router.get("/edit-product/:id", (req, res) => {
  productHelpers.getOneProData(req.params.id).then((product) => {
    id = product._id.toString();
    product._id = id;
    console.log(product._id);
    console.log(product, "----------------?/??");
    res.render("admin/edit_product.hbs", { admin: true, product: product });
  });
});
router.post("/edit-product/:id", (req, res) => {
  let id = req.params.id;
  let product = req.body;
  productHelpers.updateProduct(id, product).then(() => {
    res.redirect("/admin");
    if (req.files.Image) {
      let img=req.files.Image
      img.mv("./public/images/Shopping-Images/" + id + ".jpg")
    }
  });
});
module.exports = router;
