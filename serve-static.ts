import { serve } from 'bun';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const PORT = 3000;
const DIR = '/home/z/my-project/.next';

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;
    
    // Try to serve static file
    let filePath = join(DIR, 'server', 'app', path === '/' ? 'index.html' : path);
    if (!existsSync(filePath)) {
      filePath = join(DIR, 'static', path);
    }
    if (!existsSync(filePath)) {
      filePath = join(DIR, 'server', 'app', path + '.html');
    }
    if (!existsSync(filePath)) {
      return new Response('Not found', { status: 404 });
    }
    const content = readFileSync(filePath);
    const ext = filePath.split('.').pop();
    const types: Record<string, string> = {
      html: 'text/html', js: 'application/javascript', css: 'text/css',
      json: 'application/json', svg: 'image/svg+xml', png: 'image/png',
      ico: 'image/x-icon', woff: 'font/woff', woff2: 'font/woff2',
    };
    return new Response(content, {
      headers: { 'content-type': types[ext] || 'application/octet-stream' },
    });
  },
});
console.log(`Static server on :${PORT}`);
