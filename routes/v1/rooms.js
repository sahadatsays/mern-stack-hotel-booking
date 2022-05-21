import express from "express"
import { list, create } from "../../controllers/RoomController.js";

const router = express.Router();

router.get('/', list)
router.post('/:hotelId/create', create)

export default router;