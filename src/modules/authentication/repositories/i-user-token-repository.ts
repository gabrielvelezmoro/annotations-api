import { IUserTokenDTO } from '../dtos/i-user-token-dto'
import { UserToken } from '../infra/typeorm/entities/user-token'

interface IUserTokenRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: IUserTokenDTO): Promise<UserToken>

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken>

  deleteById(id: string): Promise<void>

  findByRefreshToken(refreshToken: string): Promise<UserToken>
}

export { IUserTokenRepository }
