const { spawn } = require('child_process');

const child = spawn(process.execPath, ['node_modules/.bin/next', 'dev', '-p', '3000'], {
  cwd: '/home/z/my-project',
  stdio: 'inherit',
});

// Prevent process from exiting
const timer = setInterval(() => {}, 10000);

child.on('exit', (code, sig) => {
  console.log(`\nServer exited (code=${code} sig=${sig}). Keeping alive anyway.`);
});

console.log('Wrapper PID:', process.pid);
