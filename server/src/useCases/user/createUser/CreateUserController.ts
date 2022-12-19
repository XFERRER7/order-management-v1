import { IUser } from "../../../types";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase"


class CreateUserController {

  async handle(req: Request, res: Response) {

    const reqBody: IUser = req.body

    const { email, name, password, apartmentNumber } = reqBody

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      email,
      name,
      password,
      apartmentNumber  
    })

    return res.json(user)

  }

}

export { CreateUserController }