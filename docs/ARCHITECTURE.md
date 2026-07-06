# Arquitetura do Projeto

## Estrutura de Pastas

```
car-parking-multiplayer/
├── server/                 # Backend Node.js
│   └── index.js           # Servidor principal
├── client/                # Frontend Phaser
│   ├── index.html         # Página principal
│   ├── css/
│   │   └── style.css      # Estilos
│   ├── js/
│   │   ├── config.js      # Configurações do jogo
│   │   ├── game.js        # Inicialização
│   │   └── scenes/        # Cenas Phaser
│   │       ├── BootScene.js
│   │       ├── MenuScene.js
│   │       └── GameScene.js
│   ├── lib/               # Bibliotecas (Phaser, Socket.io)
│   └── assets/            # Sprites, sons, etc
├── docs/                  # Documentação
├── package.json
├── README.md
└── LICENSE
```

## Componentes Principais

### Backend (Node.js + Express + Socket.io)

**Responsabilidades:**
- Gerenciar estado do jogo
- Sincronizar posições de jogadores
- Validar pontuações
- Persistir dados de jogadores

### Frontend (Phaser 3)

**Scenes:**
1. **BootScene** - Carregamento de assets e conexão ao servidor
2. **MenuScene** - Menu principal, seleção de carro
3. **GameScene** - Gameplay principal

## Fluxo de Dados

```
Cliente 1          Servidor           Cliente 2
   │                  │                  │
   ├─ join-game ─────→│                  │
   │                  ├─ player-joined ─→│
   │                  │                  │
   ├─ player-move ───→│─ pos-update ────→│
   │                  │                  │
   ├─ parking ───────→│─ score-update ──→│
   │                  │                  │
```

## Tecnologias

- **Frontend:** Phaser 3 (Game Framework)
- **Backend:** Node.js + Express
- **Real-time:** Socket.io
- **Banco de Dados:** MongoDB (preparado, não implementado)

## Performance

- Frame rate: 60 FPS
- Tick rate do servidor: 20 Hz
- Max players por jogo: 4
- Broadcast radius: Sala do jogo
