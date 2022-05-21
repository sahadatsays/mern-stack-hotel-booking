import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const list = async (req, res, next) => {
     try {
          const rooms = await Room.find();
          res.status(200).json(rooms)
     } catch (error) {
          next(error)
     }
}

export const create = async (req, res, next) => {
     const hotelId = req.params.hotelId;
     const newRoom = new Room(req.body);
     try {
          const saveRoom = await newRoom.save();
          try {
               await Hotel.findByIdAndUpdate(hotelId, {
                    $push: { rooms: saveRoom._id }
               });
          } catch (error) {
               next(error)
          }
          res.status(200).json(saveRoom)
     } catch (error) {
          next(error)
     }
}

export const show = async (req, res, next) => {

     try {
          const hotel = await Hotel.findById(req.params.id)
          res.status(200).json(hotel)
     } catch (error) {
          next(error)
     }

}

export const update = async (req, res, next) => {
     try {
          const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
          res.status(200).json(updateHotel)
     } catch (error) {
          next(error)
     }
}


export const destroy = async (req, res, next) => {
     try {
          await Room.findByIdAndDelete(req.params.id);
          res.status(200).json('Room has been deleted.')
     } catch (error) {
          next(error)
     }
}