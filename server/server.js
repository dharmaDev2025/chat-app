import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRouter.js";
import { Server } from "socket.io";

// create Express and HTTP server
const app = express();
const server = http.createServer(app);

// ✅ YOUR FRONTEND URL (ADDED)
const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-app-ten-alpha-31.vercel.app"
];

// ✅ CORS CONFIG
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// middleware
app.use(express.json({ limit: "4mb" }));

// ✅ SOCKET.IO CONFIG
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

// store online users
export const userSocketMap = {};

// socket connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  console.log("User connected:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // send online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);

    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// routes
app.get("/api/status", (req, res) => {
  res.send("Server is live");
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// connect DB
await connectDB();

// ✅ START SERVER (IMPORTANT)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

// export for vercel
export default server;