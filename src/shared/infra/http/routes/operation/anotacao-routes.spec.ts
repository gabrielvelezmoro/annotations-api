import request from "supertest";
import { Connection, getConnection } from 'typeorm';
import { app } from "../../../../infra/http/app";
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let token;
let anotacaoId;

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

    expect(response.status === 201 || response.status === 400 ).toBe(true);
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
  
  it("should be able to list all anotação", async () => {
    
    const response = await request(app).post("/notas/list")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        search: "",
        rowsPerPage: 200,
        page: 0,
        columnOrder: ["ASC", "ASC"]
      });

    anotacaoId = response.body.data[response.body.data.length - 1].id;
    
    expect(response.status).toBe(200);
  });
  
  it("should be able to select anotação by id", async () => {
    
    const response = await request(app).get(`/notas/${anotacaoId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200);
  });
  
  it("should be able to update anotação by id", async () => {
    
    const response = await request(app).put('/notas/')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        titulo: "Editado pelo jest",
        descricao: "Testa edição",
        id: anotacaoId
      });


      console.log(response.body)
    expect(response.status).toBe(200);
  });
  
  it("should be able to delete anotação by id", async () => {
    
    const response = await request(app).delete(`/notas/${anotacaoId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200);
  });

});