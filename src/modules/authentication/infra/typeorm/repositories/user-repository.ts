import { getRepository, Repository } from 'typeorm'
import { IUserDTO } from '@modules/authentication/dtos/i-user-dto'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { User } from '../entities/user'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    id,
    userGroupId,
    name,
    email,
    password,
  
  
    mustChangePasswordNextLogon,
    avatar,
    isDisabled
  }: IUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      mustChangePasswordNextLogon,
      name,
      email,
      password,
      avatar,
      isDisabled
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }
}

export { UserRepository }
