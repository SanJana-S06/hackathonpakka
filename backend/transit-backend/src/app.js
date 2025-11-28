import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
const app=express();
app.use(cors()); // allow all origins (dev only)
app.use(bodyParser.json());
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
  next();
});

// Serial port handling moved to `src/utils/serialReader.js` and is started from server.js

import busRoutes from './routes/bus.routes.js';
app.use('/api/v1/bus', busRoutes);

import routeRoutes from './routes/Routes.routes.js';
app.use('/api/v1/route', routeRoutes);

import passengerCountRoutes from './routes/PassengerCount.routes.js';
app.use('/api/v1/passenger', passengerCountRoutes);

import arduinoRoutes from './routes/arduino.routes.js';
app.use('/api/v1/arduino', arduinoRoutes);

export default app;
