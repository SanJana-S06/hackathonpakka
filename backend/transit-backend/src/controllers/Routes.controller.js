import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Route from "../models/Routes.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createRoute = asyncHandler(async (req, res, next) => {
    const { busId, stops } = req.body;
    if (!busId || !stops || !Array.isArray(stops)) {
        return next(new ApiError(400, 'busId and stops (as an array) are required'));
    }
    const routeData = { busId, stops };
    const newRoute = await Route.create(routeData);
    res.status(201).json(new ApiResponse(201, 'Route created successfully', newRoute));
});

const getAllRoutes = asyncHandler(async (req, res, next) => {
    const routes = await Route.find();
    res.status(200).json(new ApiResponse(200, 'Routes retrieved successfully', routes));
});

export { createRoute, getAllRoutes };