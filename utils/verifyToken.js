import jwt from "jsonwebtoken"
import { createError } from "./createError.js"

export const verifyToken = (req, res, next) => {
     const token = req.cookies.access_token;
     /* token empty check */
     if (!token) return next(createError(401, 'You are not authenticated.'));
     /* verify token */
     jwt.verify(token, process.env.JWT, (error, user) => {
          if (error) return next(createError(403, "Token is not valid !"));
          res.user = user;
          next();
     });
}