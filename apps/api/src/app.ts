import express from 'express';
import helmet from 'helmet';
import { corsOptions } from './config/cors';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import animalRoutes from './modules/animals/animal.routes';
import petRoutes from './modules/pets/pet.routes';
import reminderRoutes from './modules/reminders/reminder.routes';
import adoptionRoutes from './modules/adoption/adoption.routes';
import tutorProfileRoutes from './modules/tutor-profile/tutor-profile.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';
import adminRoutes from './modules/admin/admin.routes';
import { serveWebApp } from './middlewares/serveWebApp';

const app = express();

app.set('trust proxy', true);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'connect-src': ["'self'", "https://petcaretutor.com", "wss://petcaretutor.com", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
        'font-src': ["'self'", "https://fonts.gstatic.com", "https://fonts.googleapis.com"],
        'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      },
    },
  })
);
app.use(corsOptions);
app.use(express.json());
app.use(requestLogger);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'petcare-api', version: '0.1.0' });
});

app.use('/api/animals', animalRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/adoption', adoptionRoutes);
app.use('/api/tutor-profile', tutorProfileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);

serveWebApp(app);

app.use(notFound);
app.use(errorHandler);

export default app;
