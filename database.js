const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASS } = require("./config");

let database;

async function mongoConnect(callback) {
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connection succesfully.");
    database = client.db("shop");
    callback();
  } catch (err) {
    console.error("Connection error:", err);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error("No database found.");
  }
  return database;
}

module.exports = {
  mongoConnect,
  getDatabase,
};
