import { Router } from 'express'
import { SendForgotPasswordMailController } from '@modules/authentication/use-cases/send-forgot-password-mail/send-forgot-password-mail-controller'
import { ResetPasswordUserController } from '@modules/authentication/use-cases/reset-password-user/reset-password-user-controller'

const passwordsRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordUserController()

passwordsRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordsRoutes.post('/reset', resetPasswordController.handle)

export { passwordsRoutes }
