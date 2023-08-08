const { Kafka } = require('kafkajs')

const { APP_SECRET, MESSAGE_BROKER_URL,KAFKA_MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config");

// const brokers = ["host.docker.internal:29092"];
const brokers = [KAFKA_MESSAGE_BROKER_URL];
const kafka = new Kafka({
  clientId: EXCHANGE_NAME,
  brokers,
});

const producer = kafka.producer();

module.exports.connectProducer=async()=> {

  await producer.connect();
  console.log("Producer connected");
}

module.exports.disconnectFromKafka=async()=> {
  await producer.disconnect();
  console.log("Producer disconnected");
}

module.exports.sendMessage=(topic, message)=> {
  return producer.send({
    topic,
    messages: [{ value: message }],
  });
}
