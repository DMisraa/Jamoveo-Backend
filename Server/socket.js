export function initializeWebSocket(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log("web socket connected, joined room:", roomId);
    });

    socket.on("songPicked", ({ roomId, song, data }) => {
      console.log(`Admin selected a song for room: ${roomId}, song:`, song);
      io.to(roomId).emit("songSelected", { songSelected: true, song, data });
    });

    socket.on("quitSession", ({ roomId }) => {
      console.log(`Session ended by admin for room: ${roomId}`);
      io.to(roomId).emit("sessionAborted"); 
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
