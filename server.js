const { Server } = require("socket.io");
const http = require('http').createServer();

const io = new Server(http , {
    cors: {
      origin:['http://localhost:3000' , 'https://restaurant-app-poofy25.vercel.app'], // Allow requests from Next.js app origin
    },
  });

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("Client connected");
  
  socket.on("placedOrderClient", (data) => {
    socket.broadcast.emit("placedOrderServer" , data)
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
http.listen(5000, () => {
  console.log('listening on *:5000');
});