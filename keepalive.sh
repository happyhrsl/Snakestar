#!/bin/bash
while true; do
  curl -s -o /dev/null -w '' http://localhost:3000/api/auth/me 2>/dev/null
  sleep 8
done
