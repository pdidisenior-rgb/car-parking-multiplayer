# 🎬 TPA NOTÍCIAS
## *Plataforma de Vídeos de Notícias Estilo TikTok*

[![Status](https://img.shields.io/badge/status-development-orange)]()
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Node](https://img.shields.io/badge/node-18.x-green)]()

---

## 🎯 Sobre

**TPA Notícias** é uma plataforma moderna de compartilhamento de vídeos de notícias, inspirada no TikTok. Permite que utilizadores assistam, comentem, compartilhem e criem conteúdo sobre as últimas notícias de forma rápida e intuitiva.

### ✨ Features Principais

- 🎥 **Feed Infinito** - Scroll contínuo de vídeos de notícias
- ❤️ **Interação** - Like, comentários, compartilhamento
- 🔍 **Busca** - Encontre notícias por categoria ou termo
- 👤 **Perfil** - Crie seu perfil e acompanhe favoritos
- 🌙 **Dark Mode** - Interface clara ou escura
- 📱 **Mobile-First** - Totalmente responsivo
- 🔔 **Notificações** - Atualizações em tempo real
- 📤 **Upload** - Compartilhe seus vídeos
- 💬 **Comentários** - Interaja com a comunidade
- 🏷️ **Categorias** - Política, Tecnologia, Desportos, etc

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18.x
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/pdidisenior-rgb/tpa-noticias.git
cd tpa-noticias

# Instale dependências
npm install

# Inicie o backend
npm run dev

# Em outro terminal, inicie o frontend
npm run serve
```

**Aceda a:** `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
tpa-noticias/
├── frontend/
│   ├── index.html              # Página principal
│   ├── css/
│   │   ├── style.css           # Estilos principais
│   │   ├── responsive.css      # Responsividade
│   │   └── animations.css      # Animações
│   ├── js/
│   │   ├── app.js              # Aplicação principal
│   │   ├── components.js       # Componentes reutilizáveis
│   │   ├── api.js              # Comunicação com backend
│   │   └── utils.js            # Funções auxiliares
│   └── assets/
│       └── (ícones, imagens)
├── backend/
│   ├── index.js                # Servidor principal
│   ├── routes.js               # Rotas da API
│   ├── models.js               # Modelos de dados
│   └── config.js               # Configurações
├── package.json
├── README.md
└── LICENSE
```

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilos (Flexbox, Grid, Animações)
- **Vanilla JavaScript** - Lógica
- **Socket.io** - Real-time

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **Firebase** - Base de dados & autenticação
- **Socket.io** - WebSocket

---

## 📱 Funcionalidades

### 1. Feed de Vídeos
- Scroll infinito
- Vídeos adaptáveis
- Carregamento lazy
- Pré-visualização automática

### 2. Interação
- Like/Unlike
- Comentários em tempo real
- Compartilhamento social
- Favoritos

### 3. Autenticação
- Registro de utilizador
- Login seguro
- Recuperação de password
- Logout

### 4. Perfil
- Editar informações
- Histórico de vídeos
- Seguidores/Seguindo
- Preferências

### 5. Busca & Filtros
- Busca por termo
- Filtro por categoria
- Ordenação (Novo, Popular, Trending)
- Hashtags

### 6. Upload
- Carregar vídeo
- Adicionar título/descrição
- Selecionar categoria
- Publicar

---

## 🎨 Design

### Cores
- **Primária:** #FF0050 (Rosa)
- **Secundária:** #000000 (Preto)
- **Accent:** #00D4FF (Ciano)
- **Background:** #0F0F0F (Escuro)
- **Light:** #FFFFFF (Branco)

### Tipografia
- **Font:** Inter, Segoe UI, sans-serif
- **Weights:** 400, 500, 600, 700

### Ícones
- Feather Icons
- Font Awesome
- Material Icons

---

## 📊 API Endpoints

```
# Autenticação
POST   /api/auth/register       - Registar
POST   /api/auth/login          - Login
POST   /api/auth/logout         - Logout

# Vídeos
GET    /api/videos              - Listar vídeos
GET    /api/videos/:id          - Detalhe do vídeo
POST   /api/videos              - Criar vídeo
PUT    /api/videos/:id          - Editar vídeo
DELETE /api/videos/:id          - Deletar vídeo

# Interações
POST   /api/videos/:id/like     - Dar like
DELETE /api/videos/:id/like     - Remover like
POST   /api/videos/:id/comment  - Comentar
GET    /api/videos/:id/comments - Listar comentários

# Perfil
GET    /api/users/:id           - Perfil do utilizador
PUT    /api/users/:id           - Editar perfil
GET    /api/users/:id/videos    - Vídeos do utilizador

# Busca
GET    /api/search?q=term       - Buscar
GET    /api/categories          - Categorias
GET    /api/trending            - Trending
```

---

## 🔐 Autenticação

- Firebase Authentication
- JWT Tokens
- Session Management
- Refresh tokens

---

## 📈 Roadmap

### v1.0 (Atual)
- ✅ Feed básico
- ✅ Autenticação
- ✅ Likes e comentários
- ✅ Perfil de utilizador
- ✅ Busca e categorias

### v1.1 (Próximo)
- [ ] Live Streaming
- [ ] Stories
- [ ] Duetos
- [ ] Efeitos especiais
- [ ] Filtros de vídeo

### v1.2 (Futuro)
- [ ] Monetização
- [ ] Anúncios
- [ ] Painel de criador
- [ ] Analytics avançado
- [ ] API pública

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👤 Autor

**pdidisenior-rgb**
- GitHub: [@pdidisenior-rgb](https://github.com/pdidisenior-rgb)
- Email: pdidisenior@gmail.com

---

## 🙏 Agradecimentos

- Inspirado em TikTok, Instagram Reels
- Comunidade Node.js
- Comunidade de desenvolvimento open-source

---

**Made with ❤️ by pdidisenior-rgb**
