const fetch = require("node-fetch");
require("dotenv").config();
const { EMAIL_HOST } = process.env;
module.exports = {
  /**
   *
   * @param {string[]} recepitant
   * @param {string} message
   * @returns
   */
  sendEmailAPI: async (recepitant = [], subject, message) => {
    const requestBody = {
      FromEmail: "leethomas044@gmail.com",
      FromName: "Notification",
      Subject: subject,
      "Text-part": "Dear merchant, you have new order!",
      "Html-part": message,
      Recipients: recepitant.map((i) => ({ Email: i })),
    };

    const data = await new Promise((resolve, reject) => {
      fetch(EMAIL_HOST, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => {
          reject(err);
        });
    });
    return data;
  },
};
