#!/bin/bash

# 🚀 SCRIPT DE DEPLOY AUTOMÁTICO
# Executa todos os passos para colocar o jogo online

echo "🎮 CAR PARKING MULTIPLAYER - DEPLOYMENT AUTOMÁTICO"
echo "=================================================="
echo ""

# Step 1: Verificar se Git está instalado
echo "✅ Step 1: Verificando Git..."
if ! command -v git &> /dev/null; then
    echo "❌ Git não encontrado. Instale em: https://git-scm.com/"
    exit 1
fi
echo "✅ Git encontrado!"
echo ""

# Step 2: Verificar se Node.js está instalado
echo "✅ Step 2: Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale em: https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js encontrado! Versão: $(node --version)"
echo ""

# Step 3: Instalar dependências
echo "✅ Step 3: Instalando dependências..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi
echo "✅ Dependências instaladas!"
echo ""

# Step 4: Testar localmente
echo "✅ Step 4: Testando localmente..."
echo "Seu jogo estará em: http://localhost:5000"
echo "Pressione Ctrl+C para parar"
echo ""
npm start

