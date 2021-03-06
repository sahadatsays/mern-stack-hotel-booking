import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
     try {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(req.body.password, salt);
          const newUser = new User({
               username: req.body.username,
               name: req.body.name,
               email: req.body.email,
               password: hashPassword
          });
          await newUser.save();

          res.status(200).send('User has been created.')

     } catch (error) {
          next(error)
     }
}

export const login = async (req, res, next) => {
     try {
          /* username check */
          const user = await User.findOne({ username: req.body.username });
          if (!user) return next(createError(404, 'User not found.'))

          /* password match */
          let isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
          if (!isPasswordCorrect) return next(createError(400, 'Credential does not match. check username and password.'))

          const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
          const { password, isAdmin, ...others } = user._doc
          res
               .cookie("access_token", token, {
                    httpOnly: true
               })
               .status(200).json({ ...others });
     } catch (error) {
          next(error)
     }
}

export const profile = async (req, res, next) => {

     try {
          const user = await User.findById(req.params.id)
          res.status(200).json(user)
     } catch (error) {
          next(error)
     }

}