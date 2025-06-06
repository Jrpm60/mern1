export const typeDefs = `
  type Query {
    hello: String!
    precio: Int
  }
`;

export const resolvers = {
  Query: {
    hello: () => 'Hello from Yoga and Express!',
    precio: () => 200,
  },
};