const dotEnv = require("dotenv");

const configFile = `./.env.${process.env.NODE_ENV}`;
dotEnv.config({ path: configFile });

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  KAFKA_MESSAGE_BROKER_URL: process.env.KAFKA_MESSAGE_BROKER_URL,
  EXCHANGE_NAME: "ONLINE_SHOPPING",
  ORDER_BINDING_KEY: "ORDER_SERVICE",
  USER_BINDING_KEY: "USER_SERVICE",
  PRODUCT_SERVICE: "PRODUCT_SERVICE",
};
