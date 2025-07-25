import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'bolsa-producer',
  brokers: ['localhost:29092'],  // Connect to Kafka on localhost:9092
});

const producer = kafka.producer();

const acciones = ['AAPL', 'GOGL', 'TSLA', 'AMZN', 'MSFT'];

const run = async () => {
  await producer.connect();
  console.log('Producer connected to Kafka');
  
  const accionUpdate = {
    symbol: acciones[Math.floor(Math.random() * acciones.length)],
    price: (100 + Math.random() * 1000).toFixed(2),  // Random price between 100 and 1100
    timestamp: new Date().toISOString(),
  };

  console.log(accionUpdate);

  
  // Send a message to the topic "test-topic"
  await producer.send({
    topic: 'laBolsa',
    messages: [
      { value: JSON.stringify(accionUpdate) },
    ],
  });

  console.log(`Message sent to Kafka laBolsa`);

  await producer.disconnect();
}

run();