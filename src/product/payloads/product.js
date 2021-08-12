module.exports = {
  sendEmailReq: (req, reply, next) => {
    const { sku } = req.query;
    if (sku) {
      next();
      return;
    }
    throw new Error("sku must have some value");
  },
};
