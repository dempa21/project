const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
}


    writeFile = async data => {
        try {
            await fs.promises.writeFile(
                this.file, JSON.stringify(data, null, 2)
            )
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }

    getProducts = async() => {
        try {
            const productos = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(productos)
        } catch(err) {
            if(err.message.includes('no such file or directory')) return [];
            console.log(`error: ${err}`);
        }
    }

    AddProduct = async obj => {
        let productos = await this.getProducts();
        console.log(productos)
        try{
            let newId;
            productos.length === 0 ? newId = 1 : newId = productos[productos.length - 1].id + 1;
            let newObj = {...obj, id: newId};
            productos.push(newObj);
            await this.writeFile(productos);
            return newObj.id;
        } catch(err) {
            console.log(`error: ${err}`);
    }
    }

    getById = async (id) => {
        let productos = await this.getProducts();
        try {
            const obj = productos.find(product => product.id === id); 
            // return obj.id ? obj : null;
            if(obj) {return obj.id } else { return null};
        } catch (err) {
            console.log(`error: ${err}`);
    }

   
}


updateProduct = async (id, title1, description1, price1, thumbnail1, code1, stock1) => {
    let productos = await this.getProducts();
    const encontrado = Array.from(productos).find(
      (element) => element.id === id
    );
    if (encontrado) {
      encontrado.title = title1;
      encontrado.description = description1;
      encontrado.price = price1;
      encontrado.thumbnail = thumbnail1;
      encontrado.code = code1;
      encontrado.stock = stock1;
    //   console.log(encontrado);  
    //   productos.forEach( async (product) => {
    //     // extraemos los valores de cada objeto dentro del arreglo
    //     if(product.id === id) {
    //       const productIndex = product.id - 1;
    //       delete productos[productIndex];
    //     }
    // })
    //   productos.push(encontrado);
    //   console.log(result);
      // await fs.promises.unlink("./products.txt");
      const index = productos.findIndex(obj => {
        return obj.id === id;
      });
      console.log(index); // 👉️ 1
      
      productos[index].title = encontrado.title;
      productos[index].description = encontrado.description;
      productos[index].price = encontrado.price;
      productos[index].thumbnail = encontrado.thumbnail;
      productos[index].code = encontrado.code;
      productos[index].stock = encontrado.stock;


      await this.writeFile(productos);
      return productos;
  
    } else {
      console.log(encontrado);
    }
    return productos;
  };

  deleteById = async id => {
    let productos = await this.getProducts();
    try {
        productos = productos.filter(producto => producto.id != id);
        await this.writeFile(productos);
    } catch (err) {
        console.log(`error: ${err}`);
    }
}

}

module.exports = Contenedor;