import { MongoClient } from "mongodb";

// Replace with your actual MongoDB Atlas connection string
const uri = "mongodb+srv://Mongo_DB:Mongo_DB@nazaretjrpm.3hap8l8.mongodb.net/?retryWrites=true&w=majority&appName=NazaretJRPM";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    //const buildInfo = await client.db("admin").command({ buildInfo: 1 });
            //const roles = await client.db("admin").command({ rolesInfo: 1, showPrivileges: true });

            //console.log("Pinged your deployment. You successfully connected to MongoDB!");
    //console.log(buildInfo);
            //console.log(roles);

    const database = client.db("scott");
    const collection = database.collection("departamentos");

    const results = await collection.find().toArray();

    console.log("Departamentos:");
    console.log(results); 

  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.close();
  }
}

run();
