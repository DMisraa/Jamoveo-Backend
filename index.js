import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import searchSongs from "./Service/searchSongs.js";
import playSong from "./Service/playSong.js";
import login from "./Service/login.js";
import registrationHandler from "./Service/registration.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { initializeWebSocket } from "./Server/socket.js";


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

app.use(cors({
    origin: '*',
    methods: ["GET", "POST", 'PUT', 'PATCH'],
    credentials: true
  }));


initializeWebSocket(io)

app.get('/api/search', searchSongs);

app.get('/api/search/playSong', playSong)

app.post('/api/register', registrationHandler)

app.post('/api/login', login)

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
