// import { Kafka } from "kafkajs";

const { Kafka } = require('kafkajs')

const {
  APP_SECRET,
  MESSAGE_BROKER_URL,
  KAFKA_MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
  USER_BINDING_KEY,
} = require("../config");


const brokers = [KAFKA_MESSAGE_BROKER_URL];

const topics = [USER_BINDING_KEY];

const kafka = new Kafka({
  brokers,
  clientId: EXCHANGE_NAME,
});

const consumer = kafka.consumer({
  groupId: USER_BINDING_KEY,
});

module.exports.connectConsumer= async(service)=> {
  await consumer.connect();
  console.log("Connected to consumer");

  for (let i = 0; i < topics.length; i++) {
    console.log("*subscribe topic:",topics[i]);

    await consumer.subscribe({
      topic: topics[i],
      fromBeginning: true,
    });
  }

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message || !message.value) {
        return;
      }

      const data = JSON.parse(message.value.toString());
      service.SubscribeEvents(data);
      
    },
  });
}


module.exports.disconnectConsumer=async() =>{
  await consumer.disconnect();
  console.log("Disconnected from consumer");
}