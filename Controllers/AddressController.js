import express from "express";
import connection from "../connection.js";

const addressApp = express();

addressApp.use(express.json());

class AddressController {
  getUserAddressByID(request, response) {
    const { id } = request.params;

    return connection.query(
      `SELECT * FROM enderecos WHERE id_usuario = ${id}`,
      (err, res) => {
        if (err) {
          throw err;
        }

        if (res.length <= 0) {
          return response
            .status(400)
            .json({ error: "Usuário não possui nenhum endereço." });
        }

        response.status(200).json(res);
      }
    );
  }

  postAddress(request, response) {
    const {
      id_usuario,
      rua,
      bairro,
      cep,
      numero,
      cidade,
      estado,
      complemento,
    } = request.body;

    if (
      !id_usuario ||
      !rua ||
      !bairro ||
      !cep ||
      !numero ||
      !cidade ||
      !estado
    ) {
      return response
        .status(400)
        .json({ error: "Preencha todos os campos obrigatórios." });
    }

    connection.query(
      `SELECT * FROM usuarios WHERE id = ${id_usuario}`,
      (err, res) => {
        if (err) {
          throw err;
        }

        if (res.length <= 0) {
          return response
            .status(400)
            .json({ error: "Usuário não encontrado." });
        }

        connection.query(
          `INSERT INTO enderecos 
              (id_usuario, rua, bairro, cep, numero, cidade, estado, complemento) 
              VALUES 
              (?, ?, ?, ?, ?, ?, ?, ?)`,
          [id_usuario, rua, bairro, cep, numero, cidade, estado, complemento],
          (err, res) => {
            if (err) {
              throw err;
            }

            response.status(200).json({ message: "Adicionado com sucesso." });
          }
        );
      }
    );
  }

  putAddress(request, response) {
    const { id, rua, bairro, cep, numero, cidade, estado, complemento } =
      request.body;

    if (!id) {
      return response.status(400).json({ error: "ID é obrigatório." });
    }

    connection.query(
      `UPDATE enderecos
        SET rua = '${rua}', bairro = '${bairro}', cep = '${cep}', numero = '${numero}',
            cidade = '${cidade}', estado = '${estado}', complemento = '${complemento}'
        WHERE id = ${id}`,
      (err, res) => {
        if (err) {
          throw err;
        }

        response.status(200).json({ message: "Editado com sucesso." });
      }
    );
  }

  deleteAddress(request, response) {
    const { id } = request.params;

    return connection.query(
      `DELETE FROM enderecos WHERE id = ${id}`,
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

export default new AddressController();
