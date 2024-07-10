import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getTripDetails(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId", {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      })
    }
  }, async (req, res) => {
    const { tripId } = req.params

    const trip = await prisma.trip.findUnique({
      select: {
        id: true,
        destination: true,
        starts_at: true,
        ends_at: true,
        is_confirmed: true
      },
      where: {
        id: tripId
      }
    })

    if (!trip) {
      throw new Error("Trip not found.")
    }

    res.status(200)
    return { statusCode: 200, message: "Success on getting trip details.", trip }
  })
}