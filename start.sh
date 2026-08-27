#!/bin/bash
set -e

echo "Iniciando backend (API de contato) em :3001"
(cd backend && npm run dev) &
BACKEND_PID=$!

trap 'kill $BACKEND_PID 2>/dev/null || true' EXIT

echo "Iniciando frontend (Vite) em :5173"
(cd frontend && npm run dev)
