import connection from "../connection.js";
class CartController {
  getUserCartByID(request, response) {
    const { id } = request.params;

    return connection.query(
      `SELECT * FROM carrinho WHERE id_usuario = ${id}`,
      (err, res) => {
        if (err) {
          throw err;
        }

        if (res.length <= 0) {
          return response.status(400).json({ error: "Carrinho está vazio." });
        }

        response.status(200).json(res);
      }
    );
  }

  postCart(request, response) {
    const { id_usuario, id_produto, desc_produto, preco, quantidade } =
      request.body;

    if (!id_usuario || !id_produto || !desc_produto || !preco || !quantidade) {
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
          `SELECT * FROM produtos WHERE id = ${id_produto}`,
          (err, res) => {
            if (err) {
              throw err;
            }

            if (res.length <= 0) {
              return response
                .status(400)
                .json({ error: "Produto não encontrado." });
            }
            connection.query(
              `SELECT * FROM carrinho WHERE id_usuario = ? AND id_produto = ?`,
              [id_usuario, id_produto],
              (err, res) => {
                if (err) {
                  throw err;
                }

                if (res.length > 0) {
                  const quantidadeAtual = res[0].quantidade;
                  const novaQuantidade = quantidadeAtual + quantidade;

                  connection.query(
                    `UPDATE carrinho SET quantidade = ? WHERE id_usuario = ? AND id_produto = ?`,
                    [novaQuantidade, id_usuario, id_produto],
                    (err, res) => {
                      if (err) {
                        throw err;
                      }

                      response.status(200).json({
                        message: "Quantidade atualizada com sucesso.",
                      });
                    }
                  );
                } else {
                  connection.query(
                    `INSERT INTO carrinho (id_usuario, id_produto, desc_produto, preco, quantidade) VALUES (?, ?, ?, ?, ?)`,
                    [id_usuario, id_produto, desc_produto, preco, quantidade],
                    (err, res) => {
                      if (err) {
                        throw err;
                      }

                      response
                        .status(200)
                        .json({ message: "Adicionado com sucesso." });
                    }
                  );
                }
              }
            );
          }
        );
      }
    );
  }

  deleteCartItem(request, response) {
    const { id_usuario, id_produto } = request.params;

    return connection.query(
      `DELETE FROM carrinho WHERE id_usuario = ${id_usuario} AND id_produto = ${id_produto}`,
      (err, res) => {
        if (err) {
          throw err;
        }

        if (res.affectedRows <= 0) {
          return response
            .status(404)
            .json({ error: "Produto não encontrado no carrinho." });
        }

        response.status(200).json({ message: "Removido com sucesso." });
      }
    );
  }
}

export default new CartController();
