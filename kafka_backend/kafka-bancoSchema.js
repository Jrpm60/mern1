import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'graphql-api',
  brokers: ["localhost:29092"],
});

const transacciones = [];

const consumer = kafka.consumer({ groupId: 'test-group' });

await consumer.connect();
await consumer.subscribe({ topic: 'banco', fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log("retirada", {
      partition,
      value: message.value.toString(),
    });

    const precio = message.value.toString();
    transacciones.push({ precio });
  },
});

export const typeDefs = /* GraphQL */ `
  type Transaccion {
    precio: String!
  }

  type Query {
    transacciones: [Transaccion!]!
  }
`;

export const resolvers = {
  Query: {
    transacciones: () => transacciones,
  },
};