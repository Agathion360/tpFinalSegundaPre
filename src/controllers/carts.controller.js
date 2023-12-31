import cartModel from '../models/carts.models.js';
import productModel from '../models/products.models.js';

// Obtener todos los carritos
export async function getAllCarts(req, res) {
  const { limit } = req.query;
  try {
    const carts = await cartModel.find().limit(limit);
    res.status(200).send({ resultado: 'OK', message: carts });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar carritos: ${error}` });
  }
}

// Obtener un carrito por su ID
export async function getCartById(req, res) {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    cart
      ? res.status(200).send({ resultado: 'OK', message: cart })
      : res.status(404).send({ resultado: 'Not Found', message: cart });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar carrito: ${error}` });
  }
}

// Crear un nuevo carrito
export async function createCart(req, res) {
  try {
    const respuesta = await cartModel.create({});
    res.status(200).send({ resultado: 'OK', message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al crear carrito: ${error}` });
  }
}

// Agregar un producto al carrito
export async function addProductToCart(req, res) {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    const product = await productModel.findById(pid);

    if (!product) {
      res.status(404).send({ resultado: 'Product Not Found', message: product });
      return;
    }

    if (cart) {
      const productExists = cart.products.find(prod => prod.id_prod == pid);
      productExists
        ? productExists.quantity++
        : cart.products.push({ id_prod: product._id, quantity: 1 });
      await cart.save();
      res.status(200).send({ resultado: 'OK', message: cart });
    } else {
      res.status(404).send({ resultado: 'Cart Not Found', message: cart });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al agregar producto: ${error}` });
  }
}

// Eliminar un producto del carrito
export async function deleteProductFromCart(req, res) {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const productIndex = cart.products.findIndex(prod => prod.id_prod == pid);
      let deletedProduct;
      if (productIndex !== -1) {
        deletedProduct = cart.products[productIndex];
        cart.products.splice(productIndex, 1);
      } else {
        res.status(404).send({ resultado: 'Product Not Found', message: cart });
        return;
      }
      await cart.save();
      res.status(200).send({ resultado: 'OK', message: deletedProduct });
    } else {
      res.status(404).send({ resultado: 'Cart Not Found', message: cart });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
}
