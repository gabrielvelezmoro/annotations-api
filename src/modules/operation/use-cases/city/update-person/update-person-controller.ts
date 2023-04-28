import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePersonUseCase } from './update-person-use-case'

class UpdatePersonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
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

    const updatePersonUseCase = container.resolve(UpdatePersonUseCase)

    const result = await updatePersonUseCase.execute({
        id,
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

export { UpdatePersonController }
