import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { IUserTokenRepository } from '@modules/authentication/repositories/i-user-token-repository'
import { IDateProvider } from '@shared/container/providers/date-provider/i-date-provider'
import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByRefreshToken(
      token
    )

    if (!userToken) {
      throw new AppError('Invalid Token!')
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expiresDate,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError('Expired Token!')
    }

    const user = await this.userRepository.findById(userToken.userId)

    user.password = await hash(password, 8)

    await this.userRepository.create(user)

    await this.userTokenRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase }
