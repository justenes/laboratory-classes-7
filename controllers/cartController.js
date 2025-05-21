const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  try {
    const { name, price, description } = request.body;

    const product = {
      name,
      price: parseFloat(price),
      description,
    };

    await Product.add(product);
    await Cart.add(name);

    response.status(STATUS_CODE.FOUND).redirect("/products/new");
  } catch (error) {
    console.error("Ürün sepete eklenirken hata:", error);
    response
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send("Ürün sepete eklenemedi.");
  }
};


exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity();
};

