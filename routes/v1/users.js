import express from "express"
import { verifyToken } from "../../utils/verifyToken.js";

const router = express.Router();
verifyToken
router.get('/check-auth', verifyToken, (req, res, next) => {
     res.send('auth');
})

export default router;