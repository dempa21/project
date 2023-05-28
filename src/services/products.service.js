import { productsRepository } from "../repositories/dao/dbManagers/products.repository.js";

class productsServices {
    constructor() {}

    getProducts() {
        const products = productsRepository.getProducts();
        return products;
    }

    getPaginatedProducts() {
        const products = productsRepository.getPaginatedProducts();
        return products;
    }

    addProduct = async (product) => {
        const createdProduct = productsRepository.addProduct(product);
        return createdProduct;
    }

    getProductById = async (id) => {
        const product = productsRepository.getProductById(id);
        return product;
    }

    updateProduct = async (id, changes) => {
        const updatedProduct = productsRepository.updateProduct(id, changes);
        return updatedProduct;
    }

    deleteProduct = async (id) => {
        const deletedProduct = productsRepository.deleteProduct(id);
        return deletedProduct;
    }

}

export const productsService = new productsServices();