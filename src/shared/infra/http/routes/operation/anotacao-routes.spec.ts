import request from "supertest";
import { Connection, getConnection } from 'typeorm';
import { app } from "../../../../infra/http/app";
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let token;

describe("Create Anotacao Controller Integration Test", () => {
  beforeAll(async () => {
    connection = await createConnection();
  });
  
  afterAll(async () => {
    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  it("should be able to create a user", async () => {
    const response = await request(app).post("/users").send({
      name: "gabriel_teste",
	    email: "teste_gabriel@gmail.com",
	    password: "admin"
    });


    expect(response.status).toBe(201);
  });

  it("should be able to authenticate a user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "teste_gabriel@gmail.com",
      password: "admin",
    });

    token = response.body.token;

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to create anotação", async () => {
    
    const response = await request(app).post("/notas/")
      .set({ Authorization: `Bearer ${token}` })
      .send({
          titulo: "Salve",
          descricao: "salve salve",
          idPessoa: 2
      });

    expect(response.status).toBe(200);
  });

});