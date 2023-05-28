import { cartsRepository } from "../repositories/dao/dbManagers/carts.repository.js";

class cartsServices {
    constructor() {}

    getCarts() {
        const carts = cartsRepository.getCarts();
        return carts;
    }

    addCart = async (cart) => {
        const createdCart = cartsRepository.addCart(cart);
        return createdCart;
    }

    getCartById = async (id) => {
        const cart = cartsRepository.getCartById(id);
        return cart;
    }

    addProduct = async (cartId, productId, quantity) => {
        const updatedCart = cartsRepository.addProduct(cartId, productId, quantity);
        return updatedCart;
    }

    addProducts = async (cartId, products) => {
        const updatedCart = cartsRepository.addProducts(cartId, products);
        return updatedCart;
    }

    deleteProduct = async (cartId, productId) => {
        const updatedCart = cartsRepository.deleteProduct(cartId, productId);
        return updatedCart;
    }

    deleteAllProducts = async (cartId) => {
        const updatedCart = cartsRepository.deleteAllProducts(cartId);
        return updatedCart;
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        const updatedCart = cartsRepository.updateProductQuantity(cartId, productId, quantity);
        return updatedCart;
    }

}

export const cartsService = new cartsServices();