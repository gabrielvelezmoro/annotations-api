import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '@modules/authentication/infra/typeorm/repositories/user-repository'
import { AppError } from '@shared/errors/app-error'
import auth from '@config/auth'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction ) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload

    const userRepository = new UserRepository()
    const currentUser = await userRepository.findById(userId)

    request.user = {
      id: userId,
      name: currentUser.name,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
      isSuperUser: currentUser.isSuperUser
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
