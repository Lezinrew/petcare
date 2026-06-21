import { Router } from 'express';
import { petController } from './pet.controller';

const router = Router();

router.get('/', (req, res, next) => petController.list(req, res, next));
router.post('/', (req, res, next) => petController.create(req, res, next));
router.get('/:id', (req, res, next) => petController.getById(req, res, next));
router.put('/:id', (req, res, next) => petController.update(req, res, next));
router.delete('/:id', (req, res, next) => petController.delete(req, res, next));

export default router;
