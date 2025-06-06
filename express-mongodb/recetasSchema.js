import { ObjectId } from 'mongodb';

export const typeDefs = /* GraphQL */ `


type Ingrediente {
  nombre: String!
  cantidad: String!
  notas: String # Opcional
}


type Receta {
  _id: ID!
  nombre: String!
  ingredientes: [Ingrediente!]! 
  tiempoPreparacion: String
  dificultad: String
  vegano: Boolean
}


  type Query {
    recetas(dificultadMin: Int): [Receta!]!
    receta(id: ID!): Receta
  }

  input recetaInput {
    nombre: String!
    tiempoPreparacion: Float!
    dificultad: Int
  }

  type Mutation {
    addreceta(input: recetaInput!): Receta!
    updatereceta(id: ID!, input: recetaInput!): Receta
    deletereceta(id: ID!): Boolean
  }
`;



export const resolvers = {
  Query: {
    recetas: async (_parent, args, context) => {
      const db = context.db;     

    const query = {};
      if (args.dificultadMin !== undefined) {
        query.dificultad = { $gte: args.dificultadMin };
      }

      return await db.collection('recetas').find(query).toArray();
    },
    receta: async (_parent, { id }, context) => {
      const db = context.db;
      return await db.collection('recetas').findOne({ _id: new ObjectId(id) });
    },
  },
  Mutation: {
    addreceta: async (_parent, { input }, context) => {
      const db = context.db;
      const now = new Date();
      const receta = { ...input }; //, createdAt: now.toISOString(), updatedAt: now.toISOString() };
      const result = await db.collection('recetas').insertOne(receta);
      return { _id: result.insertedId, ...receta };
    },
    updatereceta: async (_parent, { id, input }, context) => {
      const db = context.db;
      //const now = new Date();
      const updateResult = await db.collection('recetas').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...input} }, //, updatedAt: now.toISOString() } },
        { returnDocument: 'after' }
      );
      return updateResult.value;
    },
    deletereceta: async (_parent, { id }, context) => {
      const db = context.db;
      const result = await db.collection('recetas').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    },
  },
};