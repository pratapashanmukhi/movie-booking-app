const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your frontend URL
    methods: ["GET", "POST"]
  }
});

// In-memory store for group booking sessions
// Format: { sessionId: { movie: {}, theatre: {}, date: "", time: "", users: [], seats: { "A1": "UserName" }, payments: [] } }
const sessions = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // When a user creates a new group booking session
  socket.on('createSession', (data, callback) => {
    const sessionId = Math.random().toString(36).substring(2, 9);
    sessions[sessionId] = {
      creatorName: data.userName,
      movie: data.movie,
      theatre: data.theatre,
      date: data.date,
      time: data.time,
      users: [],
      seats: {},
      payments: []
    };
    
    // Auto join the creator
    socket.join(sessionId);
    sessions[sessionId].users.push({ id: socket.id, name: data.userName });
    
    console.log(`Session ${sessionId} created by ${data.userName}`);
    callback({ sessionId, sessionData: sessions[sessionId] });
  });

  // When a user requests session details without joining
  socket.on('getSessionDetails', (sessionId, callback) => {
    const session = sessions[sessionId];
    if (!session) {
      return callback({ error: 'Session not found' });
    }
    
    // Return only non-sensitive/basic info needed for the accept prompt
    callback({
      creatorName: session.creatorName,
      movie: session.movie,
      theatre: session.theatre,
      date: session.date,
      time: session.time
    });
  });

  // When a user joins an existing session
  socket.on('joinSession', (data, callback) => {
    const { sessionId, userName } = data;
    const session = sessions[sessionId];

    if (!session) {
      return callback({ error: 'Session not found' });
    }

    // Join the socket room
    socket.join(sessionId);
    
    // Add user to session if not already there
    const userExists = session.users.find(u => u.id === socket.id);
    if (!userExists) {
      session.users.push({ id: socket.id, name: userName });
    }

    console.log(`${userName} joined session ${sessionId}`);
    
    // Notify others in the room
    socket.to(sessionId).emit('userJoined', { users: session.users });
    
    // Send current session state to the joining user
    callback({ sessionData: session });
  });

  // When a user selects a seat
  socket.on('selectSeat', (data) => {
    const { sessionId, seat, userName } = data;
    const session = sessions[sessionId];

    if (session) {
      // Lock the seat for this user
      session.seats[seat] = userName;
      
      console.log(`Seat ${seat} selected by ${userName} in ${sessionId}`);
      
      // Broadcast the updated seat map to everyone in the session
      io.to(sessionId).emit('seatUpdated', { seats: session.seats });
    }
  });

  // When a user deselects a seat
  socket.on('deselectSeat', (data) => {
    const { sessionId, seat, userName } = data;
    const session = sessions[sessionId];

    if (session && session.seats[seat] === userName) {
      // Only the user who selected it can deselect it
      delete session.seats[seat];
      
      console.log(`Seat ${seat} deselected by ${userName} in ${sessionId}`);
      
      // Broadcast the updated seat map
      io.to(sessionId).emit('seatUpdated', { seats: session.seats });
    }
  });

  // When a user completes their payment
  socket.on('paymentComplete', (data) => {
    const { sessionId, userName } = data;
    const session = sessions[sessionId];

    if (session) {
      if (!session.payments.includes(userName)) {
        session.payments.push(userName);
      }
      
      console.log(`${userName} completed payment in ${sessionId}`);
      
      // Broadcast payment status
      io.to(sessionId).emit('paymentStatus', { payments: session.payments });

      // Check if ALL users who selected seats have paid
      // First, get unique users who actually have seats locked
      const usersWithSeats = [...new Set(Object.values(session.seats))];
      
      const allPaid = usersWithSeats.length > 0 && usersWithSeats.every(user => session.payments.includes(user));
      
      if (allPaid) {
        console.log(`All payments complete for ${sessionId}. Confirming booking!`);
        io.to(sessionId).emit('bookingConfirmed', { 
          bookingId: `GRP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}` 
        });
      }
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Find which sessions this user was in
    for (const sessionId in sessions) {
      const session = sessions[sessionId];
      const userIndex = session.users.findIndex(u => u.id === socket.id);
      
      if (userIndex !== -1) {
        const userName = session.users[userIndex].name;
        
        // Remove user from the session
        session.users.splice(userIndex, 1);
        
        // Optional: Free up seats they had selected but not paid for?
        // Let's implement that:
        if (!session.payments.includes(userName)) {
          let seatsChanged = false;
          for (const seat in session.seats) {
            if (session.seats[seat] === userName) {
              delete session.seats[seat];
              seatsChanged = true;
            }
          }
          if (seatsChanged) {
            io.to(sessionId).emit('seatUpdated', { seats: session.seats });
          }
        }

        socket.to(sessionId).emit('userLeft', { users: session.users, leftUser: userName });
      }
      
      // Clean up empty sessions
      if (session.users.length === 0) {
        console.log(`Session ${sessionId} is empty. Cleaning up.`);
        delete sessions[sessionId];
      }
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Group Booking WebSocket server running on port ${PORT}`);
});
