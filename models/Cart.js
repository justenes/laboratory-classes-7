const { getDatabase } = require("../database");
const Product = require("./Product");

const COLLECTION_NAME = "carts";

class Cart {
  static async add(productName) {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);

    const product = await Product.findByName(productName);

    if (!product) {
      throw new Error(`Product '${productName}' not found.`);
    }

    const existing = await collection.findOne({ name: productName });

    if (existing) {
      await collection.updateOne(
        { name: productName },
        { $inc: { quantity: 1 } }
      );
    } else {
      await collection.insertOne({ name: productName, quantity: 1, price: product.price });
    }
  }

  static async getItems() {
    const db = getDatabase();
    return await db.collection(COLLECTION_NAME).find().toArray();
  }

  static async getProductsQuantity() {
    const items = await this.getItems();
    if (!items.length) return 0;

    return items.reduce((total, item) => total + item.quantity, 0);
  }

  static async getTotalPrice() {
    const items = await this.getItems();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  static async clearCart() {
    const db = getDatabase();
    await db.collection(COLLECTION_NAME).deleteMany({});
  }
}

module.exports = Cart;
