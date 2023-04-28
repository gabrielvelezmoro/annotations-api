import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePersonUseCase } from './create-person-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      organizationId,
      roleId,
      name,
      email,
      mobile,
      operatorId,
      whatsapp,
      stateId,
      cityId,
      zipCode,
      address,
      number,
      complement,
      genreId,
      validated,
      validationDate,
      disabled
    } = request.body

    const createPersonUseCase = container.resolve(CreatePersonUseCase)

    const result = await createPersonUseCase.execute({
        organizationId,
        roleId,
        name,
        email,
        mobile,
        operatorId,
        whatsapp,
        stateId,
        cityId,
        zipCode,
        address,
        number,
        complement,
        genreId,
        validated,
        validationDate,
        disabled
      })
      .then(personResult => {
        return personResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePersonController }
