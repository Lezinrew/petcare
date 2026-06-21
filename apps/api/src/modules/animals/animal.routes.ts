import { Router } from 'express';
import { SpeciesRouteKey } from '../../data/allBreeds';
import { animalController } from './animal.controller';

const router = Router();

const SPECIES_ROUTES: SpeciesRouteKey[] = ['dogs', 'cats', 'fish', 'hamsters', 'birds', 'rabbits'];

for (const routeKey of SPECIES_ROUTES) {
  router.get(`/${routeKey}`, (req, res, next) => animalController.listByRoute(routeKey, req, res, next));
  router.get(`/${routeKey}/:slug`, (req, res, next) => animalController.getByRoute(routeKey, req, res, next));
}

router.post('/seed', (req, res, next) => animalController.seedAnimals(req, res, next));

export default router;
