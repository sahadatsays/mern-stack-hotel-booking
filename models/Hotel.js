import mongoose from "mongoose";

const { Schema } = mongoose;

const hotelSchema = new Schema({
     name: { type: String, required: true },
     city: { type: String },
     address: { type: String },
     distance: { type: String, required: true },
     type: { type: String, required: true },
     description: { type: String },
     rating: { type: Number, min: 0, max: 5 },
     featured: { type: Boolean, default: false },
     rooms: { type: [String] },
     images: { type: [String] },
     cheapestPrice: { type: Number }
});


export default mongoose.model('Hotel', hotelSchema);