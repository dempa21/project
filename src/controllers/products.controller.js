import { productsService } from "../services/products.service.js";

export function getProducts() {
    const products = productsService.getProducts();    
    return res.send({ products});
}

export function getPaginatedProducts() {
    const products = productsService.getPaginatedProducts();    
    return res.send({ products});
}

export function addProduct() {
    const createdProduct = productsService.addProduct(product);    
    return createdProduct;
}

export function getProductById() {
    const product = productsService.getProductById(id);    
    return product;
}

export function updateProduct() {
    const updatedProduct = productsService.updateProduct(id, changes);    
    return updatedProduct;
}

export function deleteProduct() {
    const deletedProduct = productsService.deleteProduct(id);    
    return deletedProduct;
}
