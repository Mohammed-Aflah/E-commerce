const { MongoClient } = require('mongodb');

const state = {
  db: null,
};
module.exports.connect = (done) => {
  const url = "mongodb://127.0.0.1:27017";
  const DataBase = "SHOPPING_CART";
  const client = new MongoClient(url);
  client.connect().then(data=>{
    state.db = data.db(DataBase)
    done()
  }).catch(error=>{
   return done(error)
  })


  // client.connect( (err, data) => {
  //   if (err) return done(err);
  //   state.db = data.db(DataBase);
  //   done();
  // });
};

module.exports.get = () => {
  return state.db;
};
