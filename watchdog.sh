#!/bin/bash
cd /home/z/my-project
while true; do
  PORT_CHECK=$(ss -tlnp 2>/dev/null | grep ':3000 ' || true)
  if [ -z "$PORT_CHECK" ]; then
    echo "$(date): No server on :3000, starting..." >> /home/z/my-project/watchdog.log
    bun run dev >> /home/z/my-project/dev.log 2>&1 &
    BUN_PID=$!
    echo "$(date): Started bun PID=$BUN_PID" >> /home/z/my-project/watchdog.log
    wait $BUN_PID 2>/dev/null
    echo "$(date): Server exited, waiting 2s..." >> /home/z/my-project/watchdog.log
    sleep 2
  fi
  sleep 2
done
