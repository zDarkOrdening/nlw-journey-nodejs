import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ClientError } from "../errors/client-error";

export async function createLinks(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/trips/:tripId/links", {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      }),
      body: z.object({
        title: z.string().min(4),
        url: z.string().url()
      })
    }
  }, async (req, res) => {
    const { tripId } = req.params
    const { title, url } = req.body

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      }
    })

    if (!trip) {
      throw new ClientError("Trip not found.")
    }

    const link = await prisma.link.create({
      data: {
        title,
        url,
        trip_id: tripId
      }
    })

    res.status(201)
    return { statusCode: 201, message: "Success on registering link.", activityId: link.id }
  })
}