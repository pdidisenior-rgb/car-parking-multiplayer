class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Setup game world
    const map = MAPS.garage_1;
    this.physics.world.setBounds(0, 0, map.width, map.height);
    this.cameras.main.setBounds(0, 0, map.width, map.height);
    this.cameras.main.setBackgroundColor('#2a2a2a');

    // Create player car
    this.createPlayerCar(map);
    
    // Create parking spots
    this.createParkingSpots(map);
    
    // Create other elements
    this.createWalls(map);
    
    // Setup controls
    this.setupControls();
    
    // Setup UI
    this.setupUI();
    
    // Setup socket events
    this.setupSocketEvents();

    // Show HUD
    document.getElementById('game-hud').classList.remove('hidden');
    document.getElementById('main-menu').classList.add('hidden');
  }

  createPlayerCar(map) {
    const car = CARS[window.gameState.selectedCar];
    this.player = this.add.rectangle(
      map.spawn.x,
      map.spawn.y,
      car.width,
      car.height,
      Phaser.Display.Color.HexStringToColor(car.color).color
    );
    
    this.physics.add.existing(this.player);
    this.player.body.setDrag(0.95);
    this.player.body.setMaxSpeed(car.speed);
    this.player.rotation = 0;
    this.player.carType = window.gameState.selectedCar;
    this.player.carStats = car;
    
    this.cameras.main.startFollow(this.player);
  }

  createParkingSpots(map) {
    this.parkingSpots = this.add.group();
    
    // Create parking spots in a grid
    const spotWidth = 50;
    const spotHeight = 100;
    const spacing = 20;
    
    let spotsCreated = 0;
    for (let i = 0; i < 4 && spotsCreated < map.parkingSpots; i++) {
      for (let j = 0; j < 4 && spotsCreated < map.parkingSpots; j++) {
        const x = 200 + i * (spotWidth + spacing);
        const y = 200 + j * (spotHeight + spacing);
        
        const spot = this.add.rectangle(
          x, y, spotWidth, spotHeight,
          0xcccccc, 0.3
        );
        spot.setStrokeStyle(2, 0xFFFFFF);
        spot.isParked = false;
        
        this.physics.add.existing(spot);
        spot.body.setImmovable(true);
        
        this.parkingSpots.add(spot);
        spotsCreated++;
      }
    }
  }

  createWalls(map) {
    this.walls = this.physics.add.staticGroup();
    
    // Create boundary walls
    const wallThickness = 20;
    
    // Top
    this.walls.create(map.width / 2, wallThickness / 2, null);
    this.walls.setScale(map.width, wallThickness);
    
    // Bottom
    this.walls.create(map.width / 2, map.height - wallThickness / 2, null);
    this.walls.setScale(map.width, wallThickness);
    
    // Left
    this.walls.create(wallThickness / 2, map.height / 2, null);
    this.walls.setScale(wallThickness, map.height);
    
    // Right
    this.walls.create(map.width - wallThickness / 2, map.height / 2, null);
    this.walls.setScale(wallThickness, map.height);
    
    this.physics.add.collider(this.player, this.walls);
  }

  setupControls() {
    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    };
  }

  setupUI() {
    document.getElementById('player-name').textContent = window.gameState.playerName;
    document.getElementById('player-score').textContent = `Score: ${window.gameState.score}`;
  }

  setupSocketEvents() {
    const socket = window.gameState.socket;
    
    socket.off('player-position-update');
    socket.on('player-position-update', (data) => {
      // Update other players' positions
    });
    
    socket.off('score-update');
    socket.on('score-update', (data) => {
      if (data.playerId === window.gameState.playerId) {
        window.gameState.score = data.score;
        document.getElementById('player-score').textContent = `Score: ${data.score}`;
      }
    });
  }

  update() {
    const acceleration = this.player.carStats.acceleration;
    const maxSpeed = this.player.carStats.speed;
    
    // Handle input
    if (this.keys.up.isDown || this.keys.w.isDown) {
      this.physics.velocityFromRotation(this.player.rotation, acceleration, this.player.body.acceleration);
    } else if (this.keys.down.isDown || this.keys.s.isDown) {
      this.physics.velocityFromRotation(this.player.rotation, -acceleration / 2, this.player.body.acceleration);
    } else {
      this.player.body.setAcceleration(0, 0);
    }
    
    if (this.keys.left.isDown || this.keys.a.isDown) {
      this.player.rotation -= 0.05;
    }
    if (this.keys.right.isDown || this.keys.d.isDown) {
      this.player.rotation += 0.05;
    }
    
    if (this.keys.space.isDown) {
      this.player.body.setDrag(0.98);
    } else {
      this.player.body.setDrag(0.95);
    }
    
    if (this.keys.esc.isDown) {
      this.scene.start('MenuScene');
      document.getElementById('game-hud').classList.add('hidden');
      document.getElementById('main-menu').classList.remove('hidden');
    }
    
    // Emit position update to server
    window.gameState.socket.emit('player-move', {
      gameId: window.gameState.gameId,
      playerId: window.gameState.playerId,
      x: this.player.x,
      y: this.player.y,
      rotation: this.player.rotation
    });
    
    // Check parking collisions
    this.physics.overlap(this.player, this.parkingSpots, (player, spot) => {
      if (!spot.isParked && this.player.body.speed < 5) {
        spot.isParked = true;
        spot.setFillStyle(0x00FF00, 0.5);
        
        const score = 100;
        window.gameState.socket.emit('parking-completed', {
          gameId: window.gameState.gameId,
          playerId: window.gameState.playerId,
          score
        });
      }
    });
  }
}
