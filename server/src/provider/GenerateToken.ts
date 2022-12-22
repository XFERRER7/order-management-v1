import { sign } from "jsonwebtoken";


export class GenerateToken {
  async execute(userId: number) {

    const id = userId.toString()

    const token = sign({}, "4188e77f-4ab0-4c02-ab61-8365e3904384", {
      subject: id,
      expiresIn: "30s"
    })

    return token

  }
}