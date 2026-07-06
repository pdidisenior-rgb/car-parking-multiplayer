# API Documentation

## REST API

### GET /api/games
Lista todos os jogos disponíveis.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Player's Game",
    "players": 2,
    "maxPlayers": 4,
    "status": "playing"
  }
]
```

### POST /api/games
Cria um novo jogo.

**Request Body:**
```json
{
  "playerName": "string",
  "carType": "sedan|suv|sports|truck|compact|hybrid"
}
```

**Response:**
```json
{
  "gameId": "uuid",
  "playerId": "uuid"
}
```

## WebSocket Events

### Client → Server

#### join-game
Juntar-se a um jogo.
```javascript
socket.emit('join-game', {
  gameId: 'uuid',
  playerId: 'uuid',
  playerName: 'string',
  carType: 'sedan'
});
```

#### player-move
Atualizar posição do jogador.
```javascript
socket.emit('player-move', {
  gameId: 'uuid',
  playerId: 'uuid',
  x: number,
  y: number,
  rotation: number
});
```

#### parking-completed
Notificar conclusão de estacionamento.
```javascript
socket.emit('parking-completed', {
  gameId: 'uuid',
  playerId: 'uuid',
  score: number
});
```

### Server → Client

#### player-joined
Um novo jogador entrou.
```javascript
socket.on('player-joined', {
  player: { id, name, carType, score },
  totalPlayers: number
});
```

#### player-position-update
Atualização de posição de outro jogador.
```javascript
socket.on('player-position-update', {
  playerId: 'uuid',
  x: number,
  y: number,
  rotation: number
});
```

#### score-update
Atualização de pontuação.
```javascript
socket.on('score-update', {
  playerId: 'uuid',
  score: number
});
```

#### game-state
Estado completo do jogo.
```javascript
socket.on('game-state', gameObject);
```
