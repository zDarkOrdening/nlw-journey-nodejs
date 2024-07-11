import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ClientError } from "../errors/client-error";

export async function getParticipants(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/participants", {
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
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            is_confirmed: true
          },
        }
      }
    })

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    res.status(200)
    return { statusCode: 200, message: "Success on getting participants.", participants: trip.participants }
  })
}