import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from './routes/v1/auth.js';
import roomesRoute from './routes/v1/rooms.js';
import hotelsRoute from './routes/v1/hotels.js';
import usersRoute from './routes/v1/users.js';

const app = express(); // create app instance

dotenv.config() // dotenv config

// Connect mongoDB
const connect = async () => {
     try {
          await mongoose.connect(process.env.MONGO)
          console.log('connect mongoDB');
     } catch (error) {
          throw error
     }
}

mongoose.connection.on("disconnected", () => {
     console.log('MongoDB is disconnected');
});
mongoose.connection.on("connected", () => {
     console.log('MongoDB is connected');
});

/* Routes // Middleware */
app.use(express.json())

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomesRoute);

/* Error middleware */
app.use(cookieParser())

app.use((error, req, res, next) => {
     const errorStatus = error.status || 500
     const errorMessage = error.message || "Something is wrong !"
     return res.status(errorStatus).json({
          success: false,
          status: errorStatus,
          message: errorMessage,
          stack: error.stack
     });
});
/* index route */
app.get('/', (req, res) => {
     res.send('Hell Index Of API micro service');
})

// Application listen
app.listen(5000, () => {
     connect() // call mongoDB connect
     console.log('Connected to backend');
})