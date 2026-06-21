import { Router } from 'express';
import { animalController } from './animal.controller';

const router = Router();

router.get('/dogs', (req, res, next) => animalController.listDogs(req, res, next));
router.get('/dogs/:slug', (req, res, next) => animalController.getDogBySlug(req, res, next));
router.post('/seed', (req, res, next) => animalController.seedDogs(req, res, next));

export default router;
