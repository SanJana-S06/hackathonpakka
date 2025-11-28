import { Router } from "express";
import { createRoute, getAllRoutes } from "../controllers/Routes.controller.js";

const router = Router();

router.post('/routes', createRoute);
router.get('/routes', getAllRoutes);

export default router;