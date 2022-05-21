import express from "express"
import { verifyUser, verifyToken, verifyAdmin } from "../../utils/verifyToken.js";
import { list, update, show, destroy } from "../../controllers/UserController.js";

const router = express.Router();

router.get('/check-auth', verifyToken, (req, res, next) => {
     res.send("User");
})

router.get('/check-user/:id', verifyUser, (req, res, next) => {
     res.send('Hello User, You are logged in.');
})

router.get('/check-admin/:id', verifyAdmin, (req, res, next) => {
     res.send('Hello Admin, You are logged in.');
})

router.get("/", verifyAdmin, list);
router.get('/:id', verifyUser, show)
router.put('/:id', verifyUser, update)
router.delete('/:id', verifyUser, destroy)

export default router;