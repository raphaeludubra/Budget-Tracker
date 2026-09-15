#!/bin/bash
echo "Stopping Budget Tracker..."

BACKEND_PID=$(lsof -ti tcp:5000)
FRONTEND_PID=$(lsof -ti tcp:5173)

if [ -n "$BACKEND_PID" ]; then
  kill -9 $BACKEND_PID
  echo "Backend stopped."
else
  echo "Backend wasn't running."
fi

if [ -n "$FRONTEND_PID" ]; then
  kill -9 $FRONTEND_PID
  echo "Frontend stopped."
else
  echo "Frontend wasn't running."
fi

echo ""
echo "Done. (MongoDB keeps running in the background as usual — that's normal.)"
echo "This window will close in a few seconds..."
sleep 3
