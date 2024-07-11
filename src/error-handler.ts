import type { FastifyInstance } from "fastify"
import { ClientError } from "./errors/client-error"
import { ZodError } from "zod"

type fastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: fastifyErrorHandler = (err, req, res) => {
  console.log(err)
  if (err instanceof ClientError) {
    return res.status(400).send({
      message: err.message
    })
  } else if (err instanceof ZodError) {
    return res.status(400).send({
      message: "Validation error.",
      errors: err.flatten().fieldErrors
    });
  }
  return res.status(500).send({ message: "Internal server error." })
}