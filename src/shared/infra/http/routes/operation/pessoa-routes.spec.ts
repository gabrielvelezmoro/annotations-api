import request from "supertest";
import { Connection, getConnection } from 'typeorm';
import { app } from "../../app";
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let token;
let pessoaId;

describe("Create Pessoa Controller Integration Test", () => {
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
  
  it("should be able to create pessoa", async () => {
    
    const response = await request(app).post("/pessoas/")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        nome: "Gabriel Velezmoro",
        nomeMae: "Nome mae",
        nomePai: "Nome pai",
        cep: "88790000",
        dataNascimento: "02-07-1997"
      });
    expect(response.status).toBe(200);
  });
  
  it("should be able to list all pessoas", async () => {
    
    const response = await request(app).post("/pessoas/list")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        search: "",
        rowsPerPage: 200,
        page: 0,
        columnOrder: ["ASC", "ASC"]
      });

    pessoaId = response.body.data[response.body.data.length - 1].id;
    
    expect(response.status).toBe(200);
  });
  
  it("should be able to select pessoa by id", async () => {
    
    const response = await request(app).get(`/pessoas/${pessoaId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200);
  });
  
  it("should be able to update pessoa by id", async () => {
    
    const response = await request(app).put('/pessoas/')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        nome: "Gabriel Velezmoro (editado)",
        nomeMae: "Nome mae",
        nomePai: "Nome pai",
        cep: "88790000",
        dataNascimento: "02-07-1997"
      });


      console.log(response.body)
    expect(response.status).toBe(200);
  });
  
  it("should be able to delete pessoa by id", async () => {
    
    const response = await request(app).delete(`/pessoas/${pessoaId}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200);
  });

});