import { classToClass } from 'class-transformer'
import { IUserResponseDTO } from '../dtos/i-user-response-dto'
import { User } from '../infra/typeorm/entities/user'

class UserMap {
  static toDTO({
    id,
    email,
    name,
    avatar,
    avatarUrl,
    isBlocked,
    isDisabled
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      email,
      name,
      avatar,
      avatarUrl,
      isBlocked,
      isDisabled
    })
    
    return user
  }
}

export { UserMap }
