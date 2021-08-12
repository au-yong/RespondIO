const ProductData = require("../../assets/products.json");

module.exports = {
  findProducts: async (field, value = "") => {
    const searchTerm = new RegExp(value, "i");
    return ProductData.filter((product) => searchTerm.test(product[field]));
  },
  findOneProduct: async (field, value = "") => {
    const searchTerm = new RegExp(value, "i");
    return ProductData.find((product) => searchTerm.test(product[field]));
  },
};
