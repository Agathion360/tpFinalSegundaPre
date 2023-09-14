import { Router } from 'express';
import * as cartsController from '../controllers/carts.controller.js';

const routerCart = Router();

routerCart.get('/', cartsController.getAllCarts);
routerCart.get('/:cid', cartsController.getCartById);
routerCart.post('/', cartsController.createCart);
routerCart.put('/:cid/product/:pid', cartsController.addProductToCart);
routerCart.delete('/:cid/products/:pid', cartsController.deleteProductFromCart);

export default routerCart;
