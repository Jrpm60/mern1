import { Kafka } from 'kafkajs';
import connectDB from './db-mongodb.js';

const kafka = new Kafka({
  clientId: 'bolsa-consumer',
  brokers: ['localhost:29092'],  // Connect to Kafka on localhost:9092
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const db = await connectDB();
const bolsa = db.collection("bolsa");


const run = async () => {
  await consumer.connect();
  console.log('Consumer connected to Kafka');

  // Subscribe to the topic "test-topic"
  await consumer.subscribe({ topic: 'laBolsa', fromBeginning: true });

  // Consume messages from the topic
  await consumer.run({

    eachMessage: async ({ topic, partition, message }) => {

      const result = message.value;

      console.log(result.toString());

      const resultado = await bolsa.insertOne(JSON.parse(result));
      
    },
  });
};

run().catch(console.error);