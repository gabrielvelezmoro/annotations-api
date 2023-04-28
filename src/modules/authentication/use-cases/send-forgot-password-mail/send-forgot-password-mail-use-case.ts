import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'
import { resolve } from 'path'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { IUserTokenRepository } from '@modules/authentication/repositories/i-user-token-repository'
import { IDateProvider } from '@shared/container/providers/date-provider/i-date-provider'
import { IMailProvider } from '@shared/container/providers/mail-provider/i-mail-provider'
import { AppError } from '@shared/errors/app-error'

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgot-password.hbs'
    )

    if (!user) {
      throw new AppError('User does not exists!')
    }

    const token = uuidV4()

    const expiresDate = this.dateProvider.addHours(3)

    await this.userTokenRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    }

    await this.mailProvider.sendMail(
      email,
      'Recuperação de Senha',
      variables,
      templatePath
    )
  }
}

export { SendForgotPasswordMailUseCase }
