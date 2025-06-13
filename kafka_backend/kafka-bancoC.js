const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:29092'] });
const consumer = kafka.consumer({ groupId: 'test-group' });

async function run() {
  await consumer.connect();

  await consumer.subscribe({ topic: 'banco', fromBeginning: true });

  // Assign specific partition
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (partition === 1) {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      }
    },
  });
}

run().catch(console.error);