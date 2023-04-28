import { inject, injectable } from 'tsyringe'
import { verify, sign } from 'jsonwebtoken'
import { IUserTokenRepository } from '@modules/authentication/repositories/i-user-token-repository'
import auth from '@config/auth'
import { AppError } from '@shared/errors/app-error'
import { IDateProvider } from '@shared/container/providers/date-provider/i-date-provider'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refreshToken: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refreshToken) as IPayload

    const userId = sub

    const userToken = await this.userTokenRepository.findByUserIdAndRefreshToken(
      userId,
      token
    )

    if (!userToken) {
      throw new AppError('Refresh token does not exists!')
    }

    await this.userTokenRepository.deleteById(userToken.id)

    const refreshToken = sign({ email }, auth.secret_refreshToken, {
      subject: sub,
      expiresIn: auth.expires_in_refreshToken,
    })

    const expiresDate = this.dateProvider.addDays(
      auth.expires_refreshToken_days
    )

    await this.userTokenRepository.create({
      expiresDate,
      refreshToken,
      userId,
    })

    const newToken = sign({}, auth.secret_token, {
      subject: userId,
      expiresIn: auth.expires_in_token,
    })

    return {
      refreshToken,
      token: newToken,
    }
  }
}

export { RefreshTokenUseCase }
