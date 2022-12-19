import { Router } from "express";
import { client } from './prisma/client'
import { IApartment, IOrder } from "./types";
import { CreateUserController } from './useCases/user/createUser/CreateUserController'
import { CreateApartmentController } from './useCases/apartment/CreateApartmentController'

const userController = new CreateUserController()
const apartmentController = new CreateApartmentController()

const routes = Router();


//  APARTMENT

routes.get('/get-all-apartments', async (req, res) => {

  const apartments = await client.apartment.findMany()

  return res.json(apartments)

})

routes.post('/create-apartment', apartmentController.handle)


//  USER

routes.post('/create-user', userController.handle)

routes.get("/get-users", async (req, res) => {

  const users = await client.user.findMany()

  return res.json(users)

});


// ORDER

routes.post('/create-order', async (req, res) => {

  const reqBody: IOrder = req.body

  const {
    apartmentNumber,
    status,
    items
  } = reqBody

  const apartmentNumberExists = await client.apartment.findUnique({
    where: {
      number: apartmentNumber
    }
  })

  if (!apartmentNumberExists) {
    return res.status(400).json({ error: 'Apartment number does not exists' })
  }
  else {
    const order = await client.order.create({
      data: {
        status,
        apartmentNumber,
        itens: {
          create: items
        }
      }
    })

    res.json(order)
  }

})

routes.get('/get-orders', async (req, res) => {

  const orders = await client.order.findMany({
    include: {
      itens: true
    }
  })
  
  return res.json(orders)
  
})

routes.get('/get-orders-by-apartment/:apnumber', async (req, res) => {

  const { apnumber } = req.params

  const order = await client.order.findMany({
    where: {
      apartmentNumber: Number(apnumber)
    },
    include: {
      itens: true
    }
  })

  return res.json(order)

})

export { routes }