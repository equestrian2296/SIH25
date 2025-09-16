import express from 'express';
import { signup, login, refresh } from '../controllers/authController.mjs';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refresh);

export default router;