const GAME_CONFIG = {
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  render: {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true
  },
  scene: ['BootScene', 'MenuScene', 'GameScene']
};

const CARS = {
  sedan: {
    name: 'Sedan',
    speed: 200,
    acceleration: 300,
    color: '#FF6B35',
    width: 30,
    height: 50
  },
  suv: {
    name: 'SUV',
    speed: 180,
    acceleration: 250,
    color: '#004E89',
    width: 40,
    height: 60
  },
  sports: {
    name: 'Sports Car',
    speed: 250,
    acceleration: 400,
    color: '#F7931E',
    width: 28,
    height: 48
  },
  truck: {
    name: 'Truck',
    speed: 150,
    acceleration: 200,
    color: '#8B0000',
    width: 45,
    height: 70
  },
  compact: {
    name: 'Compact',
    speed: 220,
    acceleration: 350,
    color: '#2ECC71',
    width: 25,
    height: 40
  },
  hybrid: {
    name: 'Hybrid',
    speed: 210,
    acceleration: 320,
    color: '#9B59B6',
    width: 32,
    height: 52
  }
};

const MAPS = {
  garage_1: {
    name: 'Garage Central',
    width: 1600,
    height: 1200,
    spawn: { x: 800, y: 600 },
    parkingSpots: 8
  },
  garage_2: {
    name: 'Airport Parking',
    width: 2000,
    height: 1600,
    spawn: { x: 1000, y: 800 },
    parkingSpots: 12
  },
  garage_3: {
    name: 'Downtown Garage',
    width: 1400,
    height: 1000,
    spawn: { x: 700, y: 500 },
    parkingSpots: 10
  },
  street: {
    name: 'Street Parking',
    width: 1800,
    height: 800,
    spawn: { x: 900, y: 400 },
    parkingSpots: 6
  },
  mall: {
    name: 'Shopping Mall',
    width: 2200,
    height: 1400,
    spawn: { x: 1100, y: 700 },
    parkingSpots: 15
  }
};
