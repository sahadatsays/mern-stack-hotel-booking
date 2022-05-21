import express from "express"
import { verifyToken } from "../../utils/verifyToken.js";
import { list, update, show, destroy } from "../../controllers/UserController.js";

const router = express.Router();

router.get('/check-auth', verifyToken, (req, res, next) => {
     res.send('auth');
})

router.get("/", verifyToken, list);
router.get('/:id', verifyToken, show)
router.put('/:id', verifyToken, update)
router.delete('/:id', verifyToken, destroy)

export default router;