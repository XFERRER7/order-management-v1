import { client } from "../prisma/client";
import dayjs from 'dayjs'
import {v4 as uuid} from 'uuid'


export class GenerateRefreshToken {
  async execute(userId: number) {
    
    let generateRefreshToken = null

    const expiresIn = dayjs().add(15, 'second').unix()

    const refreshTokenExists = await client.refreshToken.findFirst({
      where: {
        userId
      }
    })

    if(refreshTokenExists) {
      //update userId
      generateRefreshToken = await client.refreshToken.update({
        where: {
          userId
        },
        data: {
          id: uuid(),
          userId,
          expiresAt: expiresIn
        }
      })
    }
    else {
      generateRefreshToken = await client.refreshToken.create({
        data: {
          userId,
          expiresAt: expiresIn
        }
       })
    }

     
     
      return generateRefreshToken

  }
}