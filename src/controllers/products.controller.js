import { productsService } from "../services/products.service.js";

export function getProducts(req, res) {
    const products = productsService.getProducts();    
    return res.send({ products });
}

export function getPaginatedProducts(req, res) {
    const products = productsService.getPaginatedProducts();    
    return res.send({ products });
}

export function addProduct(req, res) {
    const createdProduct = productsService.addProduct(product);    
    return createdProduct;
}

export function getProductById(req, res) {
    const product = productsService.getProductById(id);    
    return product;
}

export function updateProduct(req, res) {
    const updatedProduct = productsService.updateProduct(id, changes);    
    return updatedProduct;
}

export function deleteProduct(req, res) {
    const deletedProduct = productsService.deleteProduct(id);    
    return deletedProduct;
}
