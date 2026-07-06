const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Game state
const games = new Map();
const players = new Map();

// Serve static files
app.use(express.static('../client'));

// REST API Routes
app.get('/api/games', (req, res) => {
  const gamesList = Array.from(games.values()).map(game => ({
    id: game.id,
    name: game.name,
    players: game.players.length,
    maxPlayers: game.maxPlayers,
    status: game.status
  }));
  res.json(gamesList);
});

app.post('/api/games', (req, res) => {
  const { playerName, carType } = req.body;
  const gameId = uuidv4();
  const playerId = uuidv4();
  
  const newGame = {
    id: gameId,
    name: `${playerName}'s Game`,
    maxPlayers: 4,
    players: [{ id: playerId, name: playerName, carType, score: 0 }],
    status: 'waiting',
    currentMap: 'garage_1',
    createdAt: Date.now()
  };
  
  games.set(gameId, newGame);
  players.set(playerId, { gameId, name: playerName, carType });
  
  res.json({ gameId, playerId });
});

// WebSocket Events
io.on('connection', (socket) => {
  console.log(`New player connected: ${socket.id}`);

  socket.on('join-game', (data) => {
    const { gameId, playerId, playerName, carType } = data;
    const game = games.get(gameId);
    
    if (game && game.players.length < game.maxPlayers) {
      const player = {
        id: playerId,
        name: playerName,
        carType,
        score: 0,
        socketId: socket.id,
        x: Math.random() * 800,
        y: Math.random() * 600
      };
      
      game.players.push(player);
      socket.join(gameId);
      
      // Notify all players in game
      io.to(gameId).emit('player-joined', {
        player,
        totalPlayers: game.players.length
      });
      
      socket.emit('game-state', game);
    }
  });

  socket.on('player-move', (data) => {
    const { gameId, playerId, x, y, rotation } = data;
    const game = games.get(gameId);
    
    if (game) {
      const player = game.players.find(p => p.id === playerId);
      if (player) {
        player.x = x;
        player.y = y;
        player.rotation = rotation;
        
        io.to(gameId).emit('player-position-update', {
          playerId,
          x,
          y,
          rotation
        });
      }
    }
  });

  socket.on('parking-completed', (data) => {
    const { gameId, playerId, score } = data;
    const game = games.get(gameId);
    
    if (game) {
      const player = game.players.find(p => p.id === playerId);
      if (player) {
        player.score += score;
        
        io.to(gameId).emit('score-update', {
          playerId,
          score: player.score
        });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    // Clean up disconnected players
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚗 Car Parking Multiplayer Server running on port ${PORT}`);
});
