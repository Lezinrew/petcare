import { Router } from 'express';
import { adminController } from './admin.controller';
import { sendWebAppIndex } from '../../middlewares/serveWebApp';

const router = Router();

router.get('/', sendWebAppIndex);
router.post('/login', (req, res, next) => adminController.login(req, res, next));

export default router;
