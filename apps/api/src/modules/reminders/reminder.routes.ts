import { Router } from 'express';
import { reminderController } from './reminder.controller';

const router = Router();

router.get('/', (req, res, next) => reminderController.list(req, res, next));
router.post('/', (req, res, next) => reminderController.create(req, res, next));
router.get('/:id', (req, res, next) => reminderController.getById(req, res, next));
router.put('/:id', (req, res, next) => reminderController.update(req, res, next));
router.delete('/:id', (req, res, next) => reminderController.delete(req, res, next));
router.patch('/:id/done', (req, res, next) => reminderController.markDone(req, res, next));

export default router;
