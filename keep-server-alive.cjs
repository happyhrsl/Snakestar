const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = '/tmp/snakestar-stdin';

// Create FIFO if not exists
try { fs.mkfifoSync(path, 0o600); } catch {}

// Open FIFO for reading (blocks until writer), keep reference
const fifoIn = fs.openSync(path, fs.constants.O_RDONLY | fs.constants.O_NONBLOCK);

function startServer() {
  const child = spawn('node', ['node_modules/.bin/next', 'dev', '-p', '3000'], {
    stdio: [fs.openSync(path, 'r'), 'inherit', 'inherit'],
    cwd: '/home/z/my-project',
  });
  child.on('exit', () => {
    console.log('Restarting in 2s...');
    setTimeout(startServer, 2000);
  });
}

// Open write end in background to unblock the read
const writer = spawn('cat', [], { stdio: ['ignore', fs.openSync(path, 'w'), 'ignore'] });

startServer();
setInterval(() => {}, 60000);
console.log('Keep-alive started');
