import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod"
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getPartipant(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/participants/:participantId", {
    schema: {
      params: z.object({
        participantId: z.string().uuid()
      })
    }
  }, async (req, res) => {
    const { participantId } = req.params

    const participant = await prisma.participant.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        is_confirmed: true
      },
      where: {
        id: participantId
      }
    })

    if (!participant) {
      throw new Error("Participant not found.")
    }

    res.status(200)
    return { statusCode: 200, message: "Success on getting participant.", participant }
  })
}