import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


export class RefreshTokenController {

   async handle(request: Request, response: Response) {

    const { refreshToken } = request.body

    const refreshTokenUseCase = new RefreshTokenUseCase()

    const token = await refreshTokenUseCase.execute(refreshToken)
   
    response.json(token)
   }

}