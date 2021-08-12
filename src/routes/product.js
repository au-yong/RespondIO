const ProductController = require("../product/controllers/product.controller");
const { sendEmailReq } = require("../product/payloads/product");
module.exports = (fastify, opts, done) => {
  fastify.post(
    "/email",
    { preHandler: [sendEmailReq] },
    ProductController.sendProductEmail
  );
  fastify.get("/:path", ProductController.searchProduct);

  done();
};
