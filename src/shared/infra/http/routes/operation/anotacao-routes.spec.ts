import request from "supertest";

import { app } from "../../../../infra/http/app";

let token;

describe("Create Anotacao Controller Integration Test", () => {
  it("should be able to create anotação", async () => {
    
    const response = await request(app).post("/notas/").send({
        "titulo": "Salve",
        "descricao": "salve salve",
        "idPessoa": 2
    });


    console.log(response)

    expect(response.status).toBe(201);
  });

});