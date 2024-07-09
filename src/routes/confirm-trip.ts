import type { FastifyInstance } from "fastify";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function confirmTrip(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/trips:tripId/confirm", {
    schema: {
      params: z.object({
        tripId: z.string().uuid()
      })
    }
  }, async (req, res) => {
    res.status(200)
    return { statusCode: 200, message: "Success on confrming trip", tripId: req.params.tripId}
  })
}