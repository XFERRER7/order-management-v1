import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const authToken = request.headers.authorization

  if (!authToken) {

    return response.status(401).json({
      message: "Token is missing"
    })

  }

  const [, token] = authToken.split(" ")

  try {
    verify(token, "4188e77f-4ab0-4c02-ab61-8365e3904384")

    return next()

  } catch (error) {
    return response.status(401).json({
      message: "Token is invalid"
    })
  }


}