let db = require("../configuration/dBconnection");
const Collections = require("../configuration/Collections");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
// let objID = require("mongodb").ObjectId;
module.exports = {
  onSignup: (UserData) => {
    return new Promise(async (resolve, reject) => {
      UserData.Password = await bcrypt.hash(UserData.Password, 10);
      db.get()
        .collection(Collections.USER_COLLECTION)
        .insertOne(UserData)
        .then((data) => {
          resolve(UserData);
        });
    });
  },
  onLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let loginStatus = false;
      let response = {};
      let user = await db
        .get()
        .collection(Collections.USER_COLLECTION)
        .findOne({ Email: userData.Email });
      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((status) => {
          if (status) {
            console.log("Login Succes Password and Email Matched ");
            response.user = user;
            response.status = status;
            resolve(response);
          } else {
            console.log("Login Failed Pass Incorrect");
            resolve({ status: false });
          }
        });
      } else {
        console.log("login Failed Email Incorrect");
        resolve({ status: false });
      }
    });
  },
  addToCart: (productId, userId) => {
    return new Promise(async (resolve, reject) => {
      user = await db
        .get()
        .collection(Collections.CART_COLLECTION)
        .findOne({ user: new ObjectId(userId) });
      if (!user) {
        let cartObj = {
          user: new ObjectId(userId),
          products: [new ObjectId(productId)],
        };
        db.get()
          .collection(Collections.CART_COLLECTION)
          .insertOne(cartObj)
          .then((response) => {
            resolve();
          });
      } else {
        db.get()
          .collection(Collections.CART_COLLECTION)
          .updateOne(
            { user: new ObjectId(userId) },
            {
              $push: { products: new ObjectId(productId) },
            }
          )
          .then((response) => {
            resolve(response);
          });
      }
    });
  },
  getCartProduct: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cartItems = await db.get().collection(Collections.CART_COLLECTION);
    });
  },
};
