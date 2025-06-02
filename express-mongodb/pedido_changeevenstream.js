
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

// 1. definir un constante de LOW_STOCK

const LOW_STOCK = 5 ;

async function run() {
  try {
   
    await client.connect();

    const database = client.db("clase");
    const productos = database.collection("productos");

    // Open a change stream on the collection

     const changeStream = productos.watch(

    // 2. ¿Qué operaciones quieres controlar de MongoDB?

      [
        {
          $match: {operationType: {$in : ['insert', 'update']}}
        }
      ],
      {
        fullDocument: "updateLookup"
      }
    );
    
// Incluimos fullDocument: "updateLookup" ya que por defecto un update no recibe el documento


    changeStream.on("change", async (change) => {
        const id = change.documentKey._id;
        const producto = change.fullDocument;
      
        // 3. Comprobar que tienes un objecto producto

        if (!producto) {
        console.log('No product found');
        return
      }

        console.log(`Nuevo pedido Recibido. Producto: ${producto.nombreProducto} Cantidad : 50 `);

    });

    process.stdin.resume();

     // Handle shutdown signals gracefully
    process.on("SIGINT", async () => {
      await client.close();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await client.close();
      process.exit(0);
    });



  } catch (error) {
    console.error("Error connecting to MongoDB or running commands:", error);
  }
}

run();

