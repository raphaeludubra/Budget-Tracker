#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Starting Budget Tracker..."
echo ""

# Start backend in the background, detached so it survives this window closing
cd "$DIR/backend"
nohup npm run dev > "$DIR/backend.log" 2>&1 &
echo "Backend starting (logging to backend.log)..."

# Start frontend in the background, detached
cd "$DIR/frontend"
nohup npm run dev > "$DIR/frontend.log" 2>&1 &
echo "Frontend starting (logging to frontend.log)..."

# Wait for the backend to actually be ready before opening the browser
echo ""
echo "Waiting for the backend to come up..."
for i in $(seq 1 30); do
  if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "Backend is ready."
    break
  fi
  sleep 1
done

# Give the frontend a moment too, then open it
sleep 2
open http://localhost:5173

echo ""
echo "Budget Tracker is running at http://localhost:5173"
echo ""
echo "You can close this window now — the app will keep running."
echo "To stop it, double-click stop-budget-tracker.command"
