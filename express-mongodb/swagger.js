// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample API using RBAC and MongoDB',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
  },
  apis: ['./routes/*.js'], // Your route files with Swagger comments
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
