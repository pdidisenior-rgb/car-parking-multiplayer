class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    // Create gradient background
    this.cameras.main.setBackgroundColor('#004E89');
    
    // Setup menu buttons
    this.setupEventListeners();
  }

  setupEventListeners() {
    const btnNewGame = document.getElementById('btn-new-game');
    const btnJoinGame = document.getElementById('btn-join-game');
    const btnSettings = document.getElementById('btn-settings');

    btnNewGame.addEventListener('click', () => this.startNewGame());
    btnJoinGame.addEventListener('click', () => this.showJoinDialog());
    btnSettings.addEventListener('click', () => this.showSettings());
  }

  startNewGame() {
    // Show car selection
    this.showCarSelection();
  }

  showCarSelection() {
    const carOptions = Object.keys(CARS);
    // Show UI to select car
    window.gameState.selectedCar = 'sedan'; // Default
    this.showNameInput();
  }

  showNameInput() {
    const name = prompt('Digite seu nome (máximo 20 caracteres):');
    if (name && name.trim().length > 0) {
      window.gameState.playerName = name.trim().substring(0, 20);
      this.createGame();
    }
  }

  createGame() {
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerName: window.gameState.playerName,
        carType: window.gameState.selectedCar
      })
    })
    .then(res => res.json())
    .then(data => {
      window.gameState.gameId = data.gameId;
      window.gameState.playerId = data.playerId;
      
      // Join game via socket
      window.gameState.socket.emit('join-game', {
        gameId: data.gameId,
        playerId: data.playerId,
        playerName: window.gameState.playerName,
        carType: window.gameState.selectedCar
      });

      this.scene.start('GameScene');
    })
    .catch(err => console.error('Error creating game:', err));
  }

  showJoinDialog() {
    alert('Feature em desenvolvimento');
  }

  showSettings() {
    alert('Feature em desenvolvimento');
  }
}
