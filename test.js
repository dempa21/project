const Contenedor = require('./programa.js');

const products = new Contenedor('products.txt');

const test = async () => {
    let save = await products.AddProduct({
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock:25
    });
    let getAll = await products.getProducts();
    let getById = await products.getById(1);
    let updateById = await products.updateProduct(1, "producto actualizado"); 
    let deleteById = await products.deleteById(1);
    console.log(getAll);
    save;
    getAll;
    console.log("x ID-->" + getById);
    updateById;
    deleteById;
}

test();