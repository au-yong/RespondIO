const fastify = require("fastify")({
  logger: {
    prettyPrint: true,
  },
});

fastify.register(require("./routes/product"), { prefix: "/product" });
fastify.post("/webhook", (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      entry.quick_reply = "Hello";
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});
fastify.setErrorHandler(async (error, req, reply) => {
  console.log("MAIN ERROR HANDLER");
  console.log(error);
  reply.status(500);
  reply.send({
    status: 500,
    message: error.message,
    data: "",
  });
});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
