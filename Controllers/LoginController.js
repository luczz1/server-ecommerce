import connection from "../connection.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tokenConfig } from "../config/ValidateToken.js";

dotenv.config();

class LoginController {
  sendLogin(request, response) {
    const { email, senha } = request.body;

    if (!email || !senha) {
      return response
        .status(400)
        .json({ error: "Preencha todos os campos obrigatórios." });
    }

    connection.query(
      `SELECT * FROM usuarios WHERE email = '${email}' AND senha = '${senha}'`,
      (err, res) => {
        if (err) {
          throw err;
        }

        if (res.length > 0) {
          const token = generateAccessToken({ username: email });
          response.status(200).json({ token: token });
        } else {
          response.status(400).json({ error: "Email ou senha inválidos" });
        }
      }
    );
  }
}

function generateAccessToken(username) {
  return jwt.sign(username, tokenConfig.secret, { expiresIn: 43200 });
}

export default new LoginController();
