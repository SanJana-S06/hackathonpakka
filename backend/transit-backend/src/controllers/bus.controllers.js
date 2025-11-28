import {ApiError} from '../utils/ApiError.js';
import asyncHandler from "../utils/asyncHandler.js";
import Bus from '../models/Bus.models.js';
import { ApiResponse } from "../utils/ApiResponse.js";

const createBus = asyncHandler(async (req, res, next) => {
    const { busId ,route , status} = req.body;

    if (!busId) {
        return next(new ApiError(400, 'Bus ID is required'));
    }
    const busData = { busId, route, status }; 
    const newBus = await Bus.create(busData);
    res.status(201).json(new ApiResponse(201, 'Bus created successfully', newBus));
});

const getAllBuses = asyncHandler(async (req, res, next) => {
    const buses = await Bus.find();
    res.status(200).json(new ApiResponse(200, 'Buses retrieved successfully', buses));
});

export { createBus, getAllBuses };