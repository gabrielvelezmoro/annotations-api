import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/authentication/use-cases/create-user/create-user-controller'
import { UpdateUserAvatarController } from '@modules/authentication/use-cases/update-user-avatar/update-user-avatar-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'
import { ProfileUserController } from '@modules/authentication/use-cases/profile-user-use-case/profile-user-controller'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig)
const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle )
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)

export { usersRoutes }
