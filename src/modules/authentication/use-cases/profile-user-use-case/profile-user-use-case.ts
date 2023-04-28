import { inject, injectable } from 'tsyringe'
import { User } from '@modules/authentication/infra/typeorm/entities/user'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { IUserResponseDTO } from '@modules/authentication/dtos/i-user-response-dto'
import { UserMap } from '@modules/authentication/mapper/user-map'

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id)

    return UserMap.toDTO(user)
  }
}

export { ProfileUserUseCase }
