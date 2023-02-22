import connection from '../connection.js'
class ProductsController {
  getProducts(request, response) {
      return connection.query("SELECT * FROM produtos", (err, res) => {
        if (err) {
          throw err;
        }

        response.status(200).json(res);
      });
  }

  getProductsByID(request, response) {
      const { id } = request.params;

      return connection.query(
        `SELECT * FROM produtos WHERE id = ${id}`,
        (err, res) => {
          if (err) {
            throw err;
          }

          if (res.length <= 0) {
            return response
              .status(400)
              .json({ error: "Produto não encontrado." });
          }

          response.status(200).json(res);
        }
      );
  }

  postProducts(request, response) {
      const { produto, preco, ativo } = request.body;

      if (!produto || !preco || !ativo) {
        return response
          .status(400)
          .json({ error: "Preencha todos os campos obrigatórios." });
      }

      connection.query(
        `INSERT INTO produtos (produto, preco, ativo) VALUES (?, ?, ?)`, [produto, preco, ativo],
        (err, res) => {
          if (err) {
            throw err;
          }

          response.status(200).json({ message: "Adicionado com sucesso." });
        }
      );
  }

  putProducts(request, response) {
      const { id, produto, preco, ativo } = request.body;

      if (!id) {
        return response.status(400).json({ error: "ID é obrigatório." });
      }

      connection.query(
        `UPDATE produtos
        SET produto = '${produto}', preco = ${preco}, ativo = ${ativo}
        WHERE id = ${id};`,
        (err, res) => {
          if (err) {
            throw err;
          }

          response.status(200).json({ message: "Editado com sucesso." });
        }
      );
  }

  deleteProducts(request, response) {
      const { id } = request.params;

      return connection.query(
        `DELETE FROM produtos WHERE id = ${id}`,
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

export default new ProductsController();
