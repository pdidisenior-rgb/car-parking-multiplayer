const game = new Phaser.Game(GAME_CONFIG);

// Global game state
window.gameState = {
  playerName: null,
  selectedCar: 'sedan',
  gameId: null,
  playerId: null,
  score: 0,
  socket: null
};
