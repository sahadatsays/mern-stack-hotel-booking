import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
     name: { type: String, required: true },
     username: { type: String, unique: true, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     isAdmin: { type: Boolean, default: false },
},
     { timestamps: true }
);


export default mongoose.model('User', userSchema);