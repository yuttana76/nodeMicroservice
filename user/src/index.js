const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
// const { CreateChannel } = require("./utils");
const UserService = require("./services/user-service");
const { connectConsumer, disconnectConsumer } = require("./utils/kafka-consume");


async function gracefulShutdown(app) {
  console.log("Graceful shutdown");

  await app.close();
  await disconnectConsumer();

  process.exit(0);
}

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  // const channel = await CreateChannel();
  // await expressApp(app, channel);

  await expressApp(app);

  app
    .listen(PORT, async () => {
      
      const service = new UserService();
      await connectConsumer(service);
      console.log(`listening to port ${PORT}`);

    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
