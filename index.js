import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import registrationHandler from "./Service/registration.js";
import { initializeWebSocket } from "./Server/socket.js";
import searchSongs from "./Service/searchSongs.js";
import playSong from "./Service/playSong.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());
const PORT = 4000;

const httpServer = createServer(app);
const io = new Server(httpServer, {   
  cors: {
    origin: '*',
    methods: ["GET", "POST", 'PUT', 'PATCH'],
    credentials: true
  },
  
});
console.log('io:', io)
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", 'PUT', 'PATCH'],
    credentials: true
  }));

// app.get("/", (req, res) => {
//   res.send("Hello, Node.js!");
// });

initializeWebSocket(io)

app.get('/api/search', searchSongs);

app.get('/api/search/playSong', playSong)

app.post('/api/register', registrationHandler)

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
