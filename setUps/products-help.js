let db = require("../configuration/dBconnection");
const Collections = require("../configuration/Collections");
// const objectID=require('mongodb').ObjectID
let objID = require("mongodb").ObjectId;
module.exports = {
  addProdcut: (product) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(Collections.PRODUCT_COLLECTION)
        .insertOne(product)
        .then((data) => {
          console.log(data, "Print from addProduct");
          resolve(data.insertedId);
          // callback(data.insertedId);
        })
        .catch((error) => {
          console.log(error, "Print from addProduct");
        });
    });
  },
  getAllproducts: () => {
    return new Promise((resolve, reject) => {
      let products = db
        .get()
        .collection(Collections.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },
  deleteProductFromAdminList: (id) => {
    return new Promise((reslove, reject) => {
      db.get()
        .collection(Collections.PRODUCT_COLLECTION)
        .deleteOne({ _id: new objID(id) })
        .then((response) => {
          reslove(response);
        });
    });
  },
  getOneProData: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(Collections.PRODUCT_COLLECTION)
        .findOne({ _id: new objID(id) })
        .then((data) => {
          resolve(data);
        });
    });
  },
  updateProduct: (id, product) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(Collections.PRODUCT_COLLECTION)
        .updateOne(
          { _id: new objID(id) },
          {
            $set: {
              Name: product.Name,
              Description: product.Description,
              Price: product.Price,
              Category: product.Category,
            },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },
};
