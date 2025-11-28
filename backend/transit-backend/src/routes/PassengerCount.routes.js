import {Router} from 'express';
import { recordPassengerCount, getAllPassengerCounts, getLatestPassengerCount } from '../controllers/PassengerCount.controller.js';

const router=Router();

router.post('/passenger-counts',recordPassengerCount);
router.get('/passenger-counts',getAllPassengerCounts);
router.get('/passenger-counts/latest',getLatestPassengerCount);

export default router;