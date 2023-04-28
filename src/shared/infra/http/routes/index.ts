import { Router } from 'express'
import { authenticateRoutes } from './authentication/authenticate-routes'
import { usersRoutes } from './authentication/users-routes'


import { pessoaRoutes } from './operation/pessoa-routes'

const router = Router()

router.use(authenticateRoutes)

router.use('/users', usersRoutes)
router.use('/pessoas', pessoaRoutes)

export { router }
