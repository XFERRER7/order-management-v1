import { Request, Response } from "express";
import { IApartment } from "../../types";
import { CreateApartmentUseCase } from "./CreateApartmentUseCase";


class CreateApartmentController {


  async handle(req: Request, res: Response) {

    const reqBody: IApartment = req.body

    const { number } = reqBody

    const createApartmentUseCase = new CreateApartmentUseCase();

    const apartment = await createApartmentUseCase.execute({
      number
    })

    res.json(apartment)


  }

}

export { CreateApartmentController }