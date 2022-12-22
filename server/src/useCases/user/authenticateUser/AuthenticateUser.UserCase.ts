import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../../prisma/client";
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken";
import { GenerateToken } from "../../../provider/GenerateToken";

interface IUserRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {

  async execute({ email, password }: IUserRequest) {

    const userExists = await client.user.findFirst({
      where: {
        email
      }
    })

    if (!userExists) {
      throw new Error("User or password incorrect!")
    }

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) {
      throw new Error("User or password incorrect!")
    }
    
    const generateToken = new GenerateToken()

    const token = await generateToken.execute(userExists.id)

    const generateRefreshToken = new GenerateRefreshToken()

    const refreshToken = await generateRefreshToken.execute(userExists.id)

    return { token, refreshToken }


  }

}    