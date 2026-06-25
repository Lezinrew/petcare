import { Router } from 'express';
import { adminController } from './admin.controller';

const router = Router();

router.post('/login', (req, res, next) => adminController.login(req, res, next));

export default router;
