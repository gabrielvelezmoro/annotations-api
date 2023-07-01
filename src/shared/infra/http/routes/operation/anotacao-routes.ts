import { Router } from "express";
import { CreateAnotacaoController } from "@modules/operation/use-cases/anotacao/create-anotacao/create-anotacao-controller";
import { ListAnotacaoController } from "@modules/operation/use-cases/anotacao/list-anotacao/list-anotacao-controller";
import { GetAnotacaoController } from "@modules/operation/use-cases/anotacao/get-anotacao/get-anotacao-controller";
import { UpdateAnotacaoController } from "@modules/operation/use-cases/anotacao/update-anotacao/update-anotacao-controller";
import { DeleteAnotacaoController } from "@modules/operation/use-cases/anotacao/delete-anotacao/delete-anotacao-controller";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensure-authenticated";

const anotacaoRoutes = Router();

const createAnotacaoController = new CreateAnotacaoController();
const listAnotacaoController = new ListAnotacaoController();
const getAnotacaoController = new GetAnotacaoController();
const updateAnotacaoController = new UpdateAnotacaoController();
const deleteAnotacaoController = new DeleteAnotacaoController();

anotacaoRoutes.post("/", ensureAuthenticated, createAnotacaoController.handle);
anotacaoRoutes.post(
  "/list",
  ensureAuthenticated,
  listAnotacaoController.handle
);
anotacaoRoutes.get("/:id", ensureAuthenticated, getAnotacaoController.handle);
anotacaoRoutes.put("/", ensureAuthenticated, updateAnotacaoController.handle);
anotacaoRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteAnotacaoController.handle
);

export { anotacaoRoutes };
