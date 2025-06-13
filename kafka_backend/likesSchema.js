
import { Kafka } from 'kafkajs';


// --- Kafka setup ---
const kafka = new Kafka({
  clientId: 'graphql-api',
  brokers: ["localhost:29092"],  // place un .env file
});

const producer = kafka.producer();

await producer.connect();

// --- GraphQL schema ---
export const typeDefs = /* GraphQL */ `
  type Like {
    id: Int!
    valoracion: Int!
  }

  input LikeInput {
    id: Int!
    valoracion: Int!
  }

  type Mutation {
    addLike(input: LikeInput!): Boolean
    
  }

  type Query {
    hello: String
  }
`;

// --- GraphQL resolvers ---
export const resolvers = {
  Query: {
    hello: () => 'Kafka + GraphQL is working!',
  },
  Mutation: {
    addLike: async (_parent, { input }) => {
      console.log("hola");
      console.log("Datos recibidos en addLike:", input);

      await producer.send({
        topic: 'likes',
        messages: [{ value: JSON.stringify({ type: 'add', data: input }) }],
      });
      return true;
    },


  },
};