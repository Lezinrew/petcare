import { Router } from 'express';
import { requireAdminAuth } from '../../middlewares/requireAdminAuth';
import { analyticsController } from './analytics.controller';

const router = Router();

router.post('/page-view', (req, res, next) => analyticsController.trackPageView(req, res, next));
router.get('/summary', requireAdminAuth, (req, res, next) => analyticsController.summary(req, res, next));

export default router;
