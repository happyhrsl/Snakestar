#!/bin/bash
cd /home/z/my-project
# Keep stdin open — Next.js dev server exits when stdin reaches EOF
tail -f /dev/null | bun run dev >> /home/z/my-project/dev.log 2>&1
