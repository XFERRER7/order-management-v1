import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";
import { GenerateToken } from "../../provider/GenerateToken";


export class RefreshTokenUseCase {

  async execute(refreshToken: string) {

    const refreshTokenRepository = await client.refreshToken.findFirst({
      where: {
        id: refreshToken
      }
    })

    if(!refreshTokenRepository) {
      throw new Error("Refresh token invalid!")
    }

    const id = refreshTokenRepository.userId.toString()

    const token = sign({}, "4188e77f-4ab0-4c02-ab61-8365e3904384", {
      subject: id,
      expiresIn: "30s"
    })

    return { token }

  }
  
}