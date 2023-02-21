import { Router } from "express";
import productController from "./Controllers/ProductsController.js";
import userController from './Controllers/UsersController.js'
import addressController from './Controllers/AddressController.js'
import cartController from './Controllers/CartController.js'

const routes = Router();

//products
routes.get("/produtos", productController.getProducts);
routes.get("/produtos/:id", productController.getProductsByID);
routes.post("/produtos", productController.postProducts);
routes.put("/produtos", productController.putProducts);
routes.delete("/produtos/:id", productController.deleteProducts);

//users
routes.get("/usuarios", userController.getUsers);
routes.get("/usuarios/:id", userController.getUsersByID);
routes.post("/usuarios", userController.postUsers);
routes.put("/usuarios", userController.putUsers);
routes.delete("/usuarios/:id", userController.deleteUsers);

//address
routes.get("/enderecos/:id", addressController.getUserAddressByID);
routes.post("/enderecos", addressController.postAddress);
routes.put("/enderecos", addressController.putAddress);
routes.delete("/enderecos/:id", addressController.deleteAddress);

//cart
routes.get("/carrinho/:id", cartController.getUserCartByID);
routes.post("/carrinho", cartController.postCart);
routes.delete("/carrinho/:id", cartController.deleteCartItem);


export default routes;
