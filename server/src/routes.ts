import { Router } from "express";
import { PrismaClient } from '@prisma/client'

interface IUser {
  id: number,
  name: string,
  email: string,
  password: string,
  apartamentNumber: number,
}

interface IApartament {
  number: number,
}

interface IOrder {
  id: number,
  status: 'Received' | 'Delivered',
  apartamentNumber: number,
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






//  APARTAMENT

routes.post('/create-apartament', async (req, res) => {

  const reqBody: IApartament = req.body

  const { number } = reqBody

  const apartament = await prisma.apartament.create({
    data: {
      number,
    }
  })

  res.json(apartament)

})


//  USER

routes.get("/get-users", async (req, res) => {

  const users = await prisma.user.findMany()

  return res.json(users)

});

routes.post('/create-user', async (req, res) => {

  const reqBody: IUser = req.body

  const { email, name, password, apartamentNumber } = reqBody

  const apartamentNumberExists = await prisma.apartament.findUnique({
    where: {
      number: apartamentNumber
    }
  })

  if (!apartamentNumberExists) {
    return res.status(400).json({ error: 'Apartament number does not exists' })
  }
  else {

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        apartamentNumber,
      }
    })

    res.json(user)

  }

})


// ORDER

routes.post('/create-order', async (req, res) => {

  const reqBody: IOrder = req.body

  const {
    apartamentNumber,
    status,
    items
  } = reqBody

  const apartamentNumberExists = await prisma.apartament.findUnique({
    where: {
      number: apartamentNumber
    }
  })

  if (!apartamentNumberExists) {
    return res.status(400).json({ error: 'Apartament number does not exists' })
  }
  else {
    const order = await prisma.order.create({
      data: {
        status,
        apartamentNumber,
        itens: {
          create: items
        }
      }
    })

    res.json(order)
  }

})

export { routes }