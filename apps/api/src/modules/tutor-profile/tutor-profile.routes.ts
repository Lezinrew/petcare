import { Router } from 'express';
import { tutorProfileController } from './tutor-profile.controller';

const router = Router();

router.get('/', (req, res, next) => tutorProfileController.get(req, res, next));
router.put('/', (req, res, next) => tutorProfileController.upsert(req, res, next));

export default router;
