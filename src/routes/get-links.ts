import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { dayjs } from "../lib/dayjs";

export async function getLinks(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/links", {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      })
    }
  }, async (req, res) => {
    const { tripId } = req.params

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      },
      include: {
        links: true
      }
    })

    if (!trip) {
      throw new Error("Trip not found.")
    }

    res.status(201)
    return { statusCode: 201, message: "Success on getting links.", links: trip.links }
  })
}