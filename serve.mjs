import { spawn } from 'child_process';

let child;
function start() {
  console.log(`[${new Date().toISOString()}] Starting server...`);
  child = spawn('node', ['/home/z/my-project/node_modules/.bin/next', 'dev', '-p', '3000'], {
    cwd: '/home/z/my-project',
    stdio: ['inherit', 'inherit', 'inherit'],
  });
  child.on('exit', (code) => {
    console.log(`[${new Date().toISOString()}] Server exited with code ${code}, restarting in 2s...`);
    setTimeout(start, 2000);
  });
}

// Keep process alive
setInterval(() => {}, 10000);
start();
