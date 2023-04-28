import { NextFunction, Request, Response } from 'express'
import { UserRepository } from '@modules/authentication/infra/typeorm/repositories/user-repository'
import { AppError } from '@shared/errors/app-error'

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user

  const userRepository = new UserRepository()
  const user = await userRepository.findById(id)

  if (!user.isAdmin) {
    throw new AppError('User is not an admin!')
  }

  return next()
}
