import {Router} from 'express';
import { getAllBuses, createBus } from '../controllers/bus.controllers.js';

const router=Router();

router.post('/buses',createBus);
router.get('/buses',getAllBuses);

export default router;