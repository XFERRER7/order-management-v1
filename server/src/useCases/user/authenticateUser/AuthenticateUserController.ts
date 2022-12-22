import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUser.UserCase'

export class authenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUserUseCase = new AuthenticateUserUseCase()

    const token = await authenticateUserUseCase.execute({
      email,
      password
    })

    return response.json(token)
  }
}