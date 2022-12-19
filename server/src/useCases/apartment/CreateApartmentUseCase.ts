import { client } from '../../prisma/client'
import { IApartment } from '../../types'

class CreateApartmentUseCase {

  async execute({ number }: IApartment) {
    {

      const apartment = await client.apartment.create({
        data: {
          number,
        }
      })

      return apartment

    }

  }
}
export { CreateApartmentUseCase }