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

const app = express();

app.use(helmet());
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

app.use(notFound);
app.use(errorHandler);

export default app;
