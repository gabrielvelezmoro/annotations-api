import { Router } from "express";
import { CreatePessoaController } from "@modules/operation/use-cases/pessoa/create-pessoa/create-pessoa-controller";
import { ListPessoaController } from "@modules/operation/use-cases/pessoa/list-pessoa/list-pessoa-controller";
import { GetPessoaController } from "@modules/operation/use-cases/pessoa/get-pessoa/get-pessoa-controller";
import { UpdatePessoaController } from "@modules/operation/use-cases/pessoa/update-pessoa/update-pessoa-controller";
import { DeletePessoaController } from "@modules/operation/use-cases/pessoa/delete-pessoa/delete-pessoa-controller";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticated";

const pessoaRoutes = Router();

const createPessoaController = new CreatePessoaController();
const listPessoaController = new ListPessoaController();
const getPessoaController = new GetPessoaController();
const updatePessoaController = new UpdatePessoaController();
const deletePessoaController = new DeletePessoaController();

pessoaRoutes.post("/", ensureAuthenticated, createPessoaController.handle);
pessoaRoutes.post("/list", ensureAuthenticated, listPessoaController.handle);
pessoaRoutes.get("/:id", ensureAuthenticated, getPessoaController.handle);
pessoaRoutes.put("/", ensureAuthenticated, updatePessoaController.handle);
pessoaRoutes.delete("/:id", ensureAuthenticated, deletePessoaController.handle);

export { pessoaRoutes };
