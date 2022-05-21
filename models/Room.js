import mongoose from "mongoose";

const { Schema } = mongoose;

const hotelSchema = new Schema({
     name: { type: String, required: true },
     price: { type: Number, required: true },
     maxPeople: { type: Number, required: true },
     description: { type: String },
     roomNumbers: [{ number: Number, unavailableDates: [{ type: [Date] }] }]
}, { timestamps: true });


export default mongoose.model('Room', hotelSchema);