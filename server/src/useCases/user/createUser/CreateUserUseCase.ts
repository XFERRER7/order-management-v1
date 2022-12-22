import { client } from "../../../prisma/client"
import { IUser } from "../../../types"
import { hash } from 'bcryptjs'


class CreateUserUseCase {

  async execute({ email, name, password, apartmentNumber }: IUser) {

    const userAlreadyExists = await client.user.findFirst({
      where: {
        email
      }
    })

    const apartmentExists = await client.apartment.findFirst({
      where: {
        number: apartmentNumber
      }
    })

    const apartmentIsOccupied = await client.user.findFirst({
      where: {
        apartmentNumber
      }
    })

    if (userAlreadyExists) {
      throw new Error("User already exists!")
    }

    if (!apartmentExists) {
      throw new Error("Apartment does not exist")
    }

    if(apartmentIsOccupied) {
      throw new Error("Apartment is occupied")
    }

    const passwordHash = await hash(password, 8)

    const user = await client.user.create({
      data: {
        email,
        name,
        password: passwordHash,
        apartmentNumber
      }
    })

    return user

  }


}

export { CreateUserUseCase }
