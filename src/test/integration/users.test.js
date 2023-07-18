import chai from "chai";
import supertest from "supertest";
// import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");



describe("Set de pruebas de integración para modulo de usuarios", function () {
  describe("Set de pruebas para POST /api/sessions/register", function () {
    const userMock = {
      first_name: "Jorge",
      last_name: "Altamirano",
      role: "admin",
      age: "37",
      email: "jorgealta@correo.com",
      password: "123"
    };

    it("POST /api/sessions/register: Debe crear un usuario correctamente", async function () {
      const { _body } = await requester.post("/api/sessions/register").send(userMock);
      expect(_body.payload).to.have.property("_id");
    });

    it("POST /api/sessions/register: No se debe poder crear un usuario duplicado", async function () {
      const result = await requester.post("/api/sessions/register").send(userMock);
      expect(result.status).to.be.eql(500);
    });


  });
});