import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { dayjs } from "../lib/dayjs";

export async function getActivities(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/trips/:tripId/activities", {
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
        activities: {
          orderBy: {
            occurs_at: "asc"
          }
        }
      }
    })

    if (!trip) {
      throw new Error("Trip not found.")
    }

    const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(trip.starts_at, "days")

    const activities = Array.from({ length: differenceInDaysBetweenTripStartAndEnd + 1 }).map((_, index) => {
      const date = dayjs(trip.starts_at).add(index, "days")

      return {
        date: date.toDate(),
        activities: trip.activities.filter(activity => {
          return dayjs(activity.occurs_at).isSame(date, "day")
        })
      }
    })

    res.status(200)
    return { statusCode: 200, message: "Success on getting activities.", activities }
  })
}