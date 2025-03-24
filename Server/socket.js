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

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
