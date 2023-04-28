import { Router } from 'express'
import { CreatePessoaController } from '@modules/operation/use-cases/friend/create-pessoa/create-pessoa-controller'
import { ListPessoaController } from '@modules/operation/use-cases/friend/list-pessoa/list-pessoa-controller'
import { CountPessoaController } from '@modules/operation/use-cases/friend/count-pessoa/count-pessoa-controller'
import { SelectPessoaController } from '@modules/operation/use-cases/friend/select-pessoa/select-pessoa-controller'
import { GetPessoaController } from '@modules/operation/use-cases/friend/get-pessoa/get-pessoa-controller'
import { UpdatePessoaController } from '@modules/operation/use-cases/friend/update-pessoa/update-pessoa-controller'
import { DeletePessoaController } from '@modules/operation/use-cases/friend/delete-pessoa/delete-pessoa-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const pessoaRoutes = Router()

const createPessoaController = new CreatePessoaController()
const listPessoaController = new ListPessoaController()
const countPessoaController = new CountPessoaController()
const selectPessoaController = new SelectPessoaController()
const getPessoaController = new GetPessoaController()
const updatePessoaController = new UpdatePessoaController()
const deletePessoaController = new DeletePessoaController()

pessoaRoutes.post('/', ensureAuthenticated, createPessoaController.handle )
pessoaRoutes.post('/list', ensureAuthenticated, listPessoaController.handle)
pessoaRoutes.post('/count', ensureAuthenticated, countPessoaController.handle)
pessoaRoutes.post('/select', ensureAuthenticated, selectPessoaController.handle)
pessoaRoutes.get('/:id', ensureAuthenticated, getPessoaController.handle)
pessoaRoutes.put('/', ensureAuthenticated, updatePessoaController.handle)
pessoaRoutes.delete('/:id', ensureAuthenticated, deletePessoaController.handle)

export { pessoaRoutes }
