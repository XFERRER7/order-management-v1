import { Router } from "express";
import { PrismaClient } from '@prisma/client'

interface IUser {
  id: number,
  name: string,
  email: string,
  password: string,
  apartmentNumber: number,
}

interface IApartment {
  number: number,
}

interface IOrder {
  id: number,
  status: 'Received' | 'Delivered',
  apartmentNumber: number,
  items: IItem[],
  createdAt: Date,
  updatedAt: Date,
}

interface IItem {
  id: number,
  orderId: number,
  quantity: number,
  name: string,
}

const prisma = new PrismaClient()

const routes = Router();






//  APARTMENT

routes.get('/get-all-apartments', async (req, res) => {

  const apartments = await prisma.apartment.findMany()

  return res.json(apartments)

})

routes.post('/create-apartment', async (req, res) => {

  const reqBody: IApartment = req.body

  const { number } = reqBody

  const apartment = await prisma.apartment.create({
    data: {
      number,
    }
  })

  res.json(apartment)

})


//  USER

routes.get("/get-users", async (req, res) => {

  const users = await prisma.user.findMany()

  return res.json(users)

});

routes.post('/create-user', async (req, res) => {

  const reqBody: IUser = req.body

  const { email, name, password, apartmentNumber } = reqBody

  const apartmentNumberExists = await prisma.apartment.findUnique({
    where: {
      number: apartmentNumber
    }
  })

  if (!apartmentNumberExists) {
    return res.status(400).json({ error: 'Apartment number does not exists' })
  }
  else {

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        apartmentNumber,
      }
    })

    res.json(user)

  }

})


// ORDER

routes.post('/create-order', async (req, res) => {

  const reqBody: IOrder = req.body

  const {
    apartmentNumber,
    status,
    items
  } = reqBody

  const apartmentNumberExists = await prisma.apartment.findUnique({
    where: {
      number: apartmentNumber
    }
  })

  if (!apartmentNumberExists) {
    return res.status(400).json({ error: 'Apartment number does not exists' })
  }
  else {
    const order = await prisma.order.create({
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

  const orders = await prisma.order.findMany({
    include: {
      itens: true
    }
  })
  
  return res.json(orders)
  
})

routes.get('/get-orders-by-apartment/:apnumber', async (req, res) => {

  const { apnumber } = req.params

  const order = await prisma.order.findMany({
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