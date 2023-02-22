import * as jwt from "jsonwebtoken";
import { tokenConfig } from "../config/ValidateToken.js";

export default function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, tokenConfig.secret, (err, user) => {

      if (err) return res.sendStatus(401)
  
      req.user = user
  
      next()
    })
  }