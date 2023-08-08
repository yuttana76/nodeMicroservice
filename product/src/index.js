const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");
const { connectProducer, disconnectFromKafka } = require("./utils/kafka-produce")

async function gracefulShutdown(app) {
  console.log("Graceful shutdown");

  await app.close();
  await disconnectFromKafka();
  process.exit(0);
}

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  // const channel = await CreateChannel();

  await connectProducer();

  // await expressApp(app, channel);
  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`product listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });

  const signals = ["SIGINT", "SIGTERM", "SIGQUIT"];
  for (let i = 0; i < signals.length; i++) {
    const signal = signals[i];
    process.on(signal, () => {
      gracefulShutdown(app);
    });
  }

};

StartServer();
