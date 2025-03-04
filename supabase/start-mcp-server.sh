#!/bin/bash

# Script para iniciar el servidor MCP de Supabase
# Uso: ./start-mcp-server.sh [--verbose] [--debug]

# Cambiar al directorio donde se encuentra el archivo .env
cd "$(dirname "$0")/config"

# Verificar si hay procesos existentes y terminarlos
echo "Verificando procesos existentes de supabase-mcp-server..."
pkill -f supabase-mcp-server

# Esperar un momento para asegurar que los procesos se hayan terminado
sleep 2

# Construir el comando base
CMD="supabase-mcp-server"

# Agregar opciones según los parámetros
for arg in "$@"; do
  case $arg in
    --verbose)
      CMD="$CMD --verbose"
      ;;
    --debug)
      CMD="$CMD --debug"
      ;;
  esac
done

# Iniciar el servidor
echo "Iniciando el servidor MCP de Supabase..."
echo "Comando: $CMD"
$CMD

# Nota: Este script no regresará hasta que el servidor se detenga
# Para ejecutarlo en segundo plano, usa: ./start-mcp-server.sh [opciones] & 