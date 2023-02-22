import connection from '../connection.js'
class UsersController {
  getUsers(request, response) {
      return connection.query("SELECT * FROM usuarios", (err, res) => {
        if (err) {
          throw err;
        }

        response.status(200).json(res);
      });
  }

  getUsersByID(request, response) {
      const { id } = request.params;

      return connection.query(
        `SELECT * FROM usuarios WHERE id = ${id}`,
        (err, res) => {
          if (err) {
            throw err;
          }

          if (res.length <= 0) {
            return response
              .status(400)
              .json({ error: "Usuário não encontrado." });
          }

          response.status(200).json(res);
        }
      );
  }

  postUsers(request, response) {
      const { nome, email, senha } = request.body;

      if (!nome || !email || !senha) {
        return response
          .status(400)
          .json({ error: "Preencha todos os campos obrigatórios." });
      }

      connection.query(
        `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`, [nome, email, senha],
        (err, res) => {
          if (err) {
            throw err;
          }

          response.status(200).json({ message: "Adicionado com sucesso." });
        }
      );
  }

  putUsers(request, response) {
      const { id, nome, email, senha } = request.body;

      if (!id) {
        return response.status(400).json({ error: "ID é obrigatório." });
      }

      connection.query(
        `UPDATE usuarios
        SET nome = '${nome}', email = '${email}', senha = '${senha}'
        WHERE id = ${id};`,
        (err, res) => {
          if (err) {
            throw err;
          }

          response.status(200).json({ message: "Editado com sucesso." });
        }
      );
  }

  deleteUsers(request, response) {
      const { id } = request.params;

      return connection.query(
        `DELETE FROM usuarios WHERE id = ${id}`,
        (err, res) => {
          if (err) {
            throw err;
          }

          if (res.length <= 0) {
            return response
              .status(400)
              .json({ error: "Produto não encontrado." });
          }

          response.status(200).json({ message: "Deletado com sucesso." });
        }
      );
  }
}

export default new UsersController();
