const {
  findProducts,
  sendProductEmail,
} = require("../services/product.service");

module.exports = {
  searchProduct: async (req) => {
    const { path = "price" } = req.params;
    let field = path;
    if (path === "desc") {
      field = "description";
    }
    return {
      status: 200,
      message: "Get Product Success",
      product: await findProducts(field, req.query.search),
    };
  },
  sendProductEmail: async (req) => {
    const { sku } = req.query;
    return {
      status: 200,
      message: "Send Product Email Success",
      product: await sendProductEmail(sku),
    };
  },
};
