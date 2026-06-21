import { Router } from 'express';
import { adoptionController } from './adoption.controller';

const router = Router();

router.post('/match', (req, res, next) => adoptionController.match(req, res, next));

export default router;
