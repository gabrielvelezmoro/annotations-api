import { IUserDTO } from '../dtos/i-user-dto'
import { User } from '../infra/typeorm/entities/user'

interface IUserRepository {
  create(data: IUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}

export { IUserRepository }
