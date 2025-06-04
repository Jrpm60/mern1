import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { Server as SocketIOServer } from "socket.io";
import connectDB from './db-mongodb.js';  // Asegúrate de que este módulo se conecta correctamente
import chatRouter from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    const db = await connectDB();
    app.locals.db = db;

    app.use('/api/v1/chat', chatRouter);

    const httpServer = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    const io = new SocketIOServer(httpServer, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      socket.on("joinRoom", (room) => {
        console.log(`Socket ${socket.id} joined room ${room}`);
        socket.join(room);
      });

      socket.on("chatRoomMessage", async ({ room, message, nick }) => {
        const chatDoc = {
          userIdDoc: socket.id,
          roomDoc: room,
          nickDoc: nick,
          messageDoc: message,
          timestampDoc: new Date()
        };

        console.log("Received message:", chatDoc);

        // Enviar a todos en la sala excepto al emisor
        socket.to(room).emit('chatRoomMessage', { message, nick });

        // Guardar en base de datos
        await db.collection('chatroom').insertOne(chatDoc);
      });

      socket.on("disconnect", (reason) => {
        console.log(`User disconnected ${socket.id} (${reason})`);
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
