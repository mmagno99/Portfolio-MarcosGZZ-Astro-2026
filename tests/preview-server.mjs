// Local browser QA of the production files and the real form handler.
// SMTP is simulated here; this server never reads .env or connects to Brevo.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { handleQuote } from '../src/features/quote/server.mjs';

const root = path.resolve('.vercel/output/static');
const origin = 'http://127.0.0.1:4323';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};
const env = {
  BREVO_SMTP_USER: 'simulation',
  BREVO_SMTP_PASS: 'simulation',
  QUOTE_MAIL_FROM: 'from@example.com',
  QUOTE_MAIL_TO: 'to@example.com',
};
const server = createServer(async (incoming, outgoing) => {
  try {
    const url = new URL(incoming.url, origin);
    if (url.pathname === '/api/send-email') {
      const request = new Request(url, {
        method: incoming.method,
        headers: incoming.headers,
        ...(incoming.method === 'POST'
          ? { body: incoming, duplex: 'half' }
          : {}),
      });
      const response = await handleQuote(request, {
        env,
        ip: incoming.socket.remoteAddress,
        send: async (message) => {
          if (message.text.includes('Prueba de error SMTP'))
            throw Error('Simulated SMTP failure');
          console.log(
            'Simulated SMTP: validated request accepted. No email sent.',
          );
        },
      });
      outgoing.writeHead(response.status, Object.fromEntries(response.headers));
      outgoing.end(await response.text());
      return;
    }
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) {
      outgoing.writeHead(403).end();
      return;
    }
    if (!path.extname(file)) file = path.join(file, 'index.html');
    const body = await readFile(file);
    outgoing.writeHead(200, {
      'Content-Type': types[path.extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    outgoing.end(body);
  } catch {
    outgoing.writeHead(404).end('Not found');
  }
});
server.listen(4323, '127.0.0.1', () =>
  console.log(`Production QA preview: ${origin}. SMTP SIMULATED.`),
);
