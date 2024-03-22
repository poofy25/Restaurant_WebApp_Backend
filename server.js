require('dotenv').config()

const { Server } = require("socket.io");
const http = require('http').createServer();
const port = process.env.PORT || 5000

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
http.listen(port, () => {
  console.log('listening on *:' , port);
});