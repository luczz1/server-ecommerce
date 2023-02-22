import { Router } from "express";
import ValidateToken from "./middlewares/ValidateToken.js";

import productController from "./Controllers/ProductsController.js";
import userController from './Controllers/UsersController.js'
import addressController from './Controllers/AddressController.js'
import cartController from './Controllers/CartController.js'
import loginController from './Controllers/LoginController.js'

const routes = Router();

//products
routes.get("/produtos", ValidateToken, productController.getProducts);
routes.get("/produtos/:id", ValidateToken, productController.getProductsByID);
routes.post("/produtos", ValidateToken, productController.postProducts);
routes.put("/produtos", ValidateToken, productController.putProducts);
routes.delete("/produtos/:id", ValidateToken, productController.deleteProducts);

//users
routes.get("/usuarios", ValidateToken, userController.getUsers);
routes.get("/usuarios/:id", ValidateToken, userController.getUsersByID);
routes.post("/usuarios", ValidateToken, userController.postUsers);
routes.put("/usuarios", ValidateToken, userController.putUsers);
routes.delete("/usuarios/:id", ValidateToken, userController.deleteUsers);

//address
routes.get("/enderecos/:id", ValidateToken, addressController.getUserAddressByID);
routes.post("/enderecos", ValidateToken, addressController.postAddress);
routes.put("/enderecos", ValidateToken, addressController.putAddress);
routes.delete("/enderecos/:id", ValidateToken, addressController.deleteAddress);

//cart
routes.get("/carrinho/:id", ValidateToken, cartController.getUserCartByID);
routes.post("/carrinho", ValidateToken, cartController.postCart);
routes.delete("/carrinho/:id_usuario/:id_produto", ValidateToken, cartController.deleteCartItem);

//login
routes.post("/login", loginController.sendLogin);

export default routes;
