import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'
import handlebars from 'handlebars'
import fs from 'fs'
import { IMailProvider } from '../i-mail-provider'

@injectable()
class SmtpMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: String(process.env.SMTP_HOST),
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
          user: String(process.env.SMTP_USER),
          pass: String(process.env.SMTP_PASS)
      }
  })
  
  this.client = transporter
  }
  
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path, 'utf-8').toString().replace(/(\r)/gm, "\n")
    const templateParse = handlebars.compile(templateFileContent)
    const templateHTML = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      from: 'febra <noreplay@febrapdp.com.br>',
      subject,
      html: templateHTML
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export { SmtpMailProvider }
