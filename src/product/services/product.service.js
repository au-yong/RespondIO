const { sendEmailAPI } = require("../../apiRequest/sendEmailWithMailJet");
const ProductRepo = require("../repos/product.repo");

module.exports = {
  findProducts: async (field, value) => {
    return await ProductRepo.findProducts(field, value);
  },
  sendProductEmail: async (productName) => {
    const product = await ProductRepo.findOneProduct("sku", productName);

    await sendEmailAPI(
      ["leethomas044@gmail.com"],
      "You have new order!",
      `<h3>Dear merchant, you have new order! Here the info for you to prepare your parcel.</h3>
    <table>
    <tr>
      <td>Sku:</td>
      <td>${product.sku}</td>
    </tr>
    <tr>
      <td>Name:</td>
      <td>${product.name}</td>
    </tr>
    <tr>
      <td>Type:</td>
      <td>${product.type}</td>
    </tr>
    <tr>
      <td>Price:</td>
      <td>${product.price}</td>
    </tr>
    <tr>
      <td>Shipping Fee:</td>
      <td>${product.shipping}</td>
    </tr>
    <tr>
      <td>Description:</td>
      <td>${product.description}</td>
    </tr>
    <tr>
      <td>Manufacturer:</td>
      <td>${product.manufacturer}</td>
    </tr>
    <tr>
      <td>Model:</td>
      <td>${product.model}</td>
    </tr>
    </table>
    `
    );
    return "done";
  },
};
