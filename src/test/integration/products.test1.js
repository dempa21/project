import chai from "chai";
import supertest from "supertest";
// import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integración para módulo de productos", function () {
    describe("POST /api/products", function () {

        const productMock = {
          title: "TV",
          description: "TV 22 inches",
          price: "122 USD",
          status: true,
          code: "ABC",
          stock: 2,
          category: "Electronic"
        };

        it("Debe crear productos correctamente", async function() {
            const {_body} = await requester
            .post("/api/products")
            .send(productMock)

            expect(_body.payload).to.have.property("_id");
        })

        const productMocksTitle = {
          description: "TV 22 inches",
          price: "122 USD",
          status: true,
          code: "ABC",
          stock: 2,
          category: "Electronic"
        };

        it("Si se desea crear un producto sin el campo title el módulo debe responder con status 401", async function() {
            const result = await requester.post("/api/products").send(productMocksTitle);
            expect(result.status).to.be.eql(401);
        })

    })





    it("POST /api/products: Debe crear un producto con la ruta de una imagen", async function () {
      
      const productMock = {
        title: "TV",
        description: "TV 22 inches",
        price: "122 USD",
        status: true,
        code: "ABC",
        stock: 2,
        category: "Electronic"
      };

      const result = await requester
        .post("/api/products/")
        .field("title", productMock.title)
        .field("description", productMock.description)
        .field("price", productMock.price)
        .field("status", productMock.status)
        .field("code", productMock.code)
        .field("stock", productMock.stock)
        .field("category", productMock.category)
        .attach("thumbnails", "./src/test/integration/assets/tv.jpg");

      expect(result.status).to.be.eql(200);
      expect(result.payload).to.have.property("_id");
      expect(result.payload.thumbnails).to.be.ok;
    });
  });
//   });
// });