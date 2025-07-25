import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { Server as SocketIOServer } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


async function startServer() {

  try {
    
    // Create HTTP server from express app
    const httpServer = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Setup Socket.IO server on the same HTTP server
    const io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*", // adjust for your frontend origin
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected");
      console.log(`User ${socket.id}`);

        socket.on("chatMessage", (data) => {
            console.log(`chat message recibido ${data} `);

            socket.emit("chatReply", `Me has dicho ${data}`)
        });
      
    
    socket.on("disconnect", (reason) => {
    console.log(`User disconnected ${socket.id} and ${reason}`)

      })
    })
 
  }

  catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
}

startServer();