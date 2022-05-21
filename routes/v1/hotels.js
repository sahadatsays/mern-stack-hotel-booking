import express from "express";
import { create, destroy, list, show, update } from "../../controllers/HotelController.js";


const router = express.Router();

router.get("/", list);
router.post('/', create);
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', destroy)


export default router;