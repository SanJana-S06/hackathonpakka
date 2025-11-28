import { ApiError } from "../utils/ApiError.js";   
import asyncHandler from "../utils/asyncHandler.js";
import PassengerCount from "../models/PassengerCount.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const recordPassengerCount = asyncHandler(async (req, res, next) => {
    const { busId, passengers, percentage } = req.body;
    if (!busId || passengers == null || percentage == null) {
        return next(new ApiError(400, 'busId, passengers, and percentage are required'));
    }
    const passengerCountData = { busId, passengers, percentage };
    const newPassengerCount = await PassengerCount.create(passengerCountData);
    res.status(201).json(new ApiResponse(201, 'Passenger count recorded successfully', newPassengerCount));
});

const getAllPassengerCounts = asyncHandler(async (req, res, next) => {
    const passengerCounts = await PassengerCount.find();
    res.status(200).json(new ApiResponse(200, 'Passenger counts retrieved successfully', passengerCounts));
});

const getLatestPassengerCount = asyncHandler(async (req, res, next) => {
    const latestCount = await PassengerCount.findOne().sort({ timestamp: -1 });
    if (!latestCount) {
        return res.status(200).json(new ApiResponse(200, 'No passenger count data available yet', null));
    }
    res.status(200).json(new ApiResponse(200, 'Latest passenger count retrieved successfully', latestCount));
});

export { recordPassengerCount, getAllPassengerCounts, getLatestPassengerCount };
