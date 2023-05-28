import { cartsService } from "../services/carts.service.js";

export function getCarts() {
    const carts = cartsService.getCarts();    
    return res.send({ carts});
}

export function addCart(cart) {
    const createdCart = cartsService.addCart(cart);    
    return res.send({ createdCart });
}

export function getCartById(id) {
    const cart = cartsService.getCartById(id);    
    return cart;
}

export function addProduct(cartId, productId, quantity) {
    const updatedCart = cartsService.addProduct(cartId, productId, quantity);    
    return updatedCart;
}

export function addProducts(cartId, products) {
    const updatedCart = cartsService.addProducts(cartId, products);    
    return updatedCart;
}

export function deleteProduct(cartId, productId) {
    const updatedCart = cartsService.deleteProduct(cartId, productId);    
    return updatedCart;
}


export function deleteAllProducts(cartId) {
    const updatedCart = cartsService.deleteAllProducts(cartId);    
    return updatedCart;
}

export function updateProductQuantity(cartId, productId, quantity) {
    const updatedCart = cartsService.updateProductQuantity(cartId, productId, quantity);    
    return updatedCart;
}
