import path from 'path';
import express, { Express, Request, Response } from 'express';
import { env } from '../config/env';

const WEB_DIST = path.join(__dirname, '../../web/dist');

export function serveWebApp(app: Express): void {
  if (env.isDevelopment) return;

  app.use(express.static(WEB_DIST, { index: false }));

  app.get('*', (req: Request, res: Response, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(WEB_DIST, 'index.html'), (err) => {
      if (err) next(err);
    });
  });
}
