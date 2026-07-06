class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.setPath('assets/');
    // Load assets
  }

  create() {
    // Connect to server
    if (!window.gameState.socket) {
      window.gameState.socket = io();
      this.setupSocketListeners();
    }
    
    this.scene.start('MenuScene');
  }

  setupSocketListeners() {
    const socket = window.gameState.socket;

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('player-joined', (data) => {
      console.log('Player joined:', data);
    });

    socket.on('player-position-update', (data) => {
      // Update player positions in game
    });

    socket.on('score-update', (data) => {
      console.log('Score updated:', data);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }
}
