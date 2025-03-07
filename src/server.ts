import Fastify from "fastify";
import cors from "@fastify/cors"
import { createTrip } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLinks } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getPartipant } from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const fastify = Fastify()

fastify.register(cors, {
  origin: '*'
})

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.setErrorHandler(errorHandler)

fastify.register(createTrip)
fastify.register(confirmTrip)
fastify.register(confirmParticipant)
fastify.register(createActivity)
fastify.register(getActivities)
fastify.register(createLinks)
fastify.register(getLinks)
fastify.register(getParticipants)
fastify.register(createInvite)
fastify.register(updateTrip)
fastify.register(getTripDetails)
fastify.register(getPartipant)

fastify.listen({ port: env.PORT }).then(() => {
  console.log(`Server listening on port ${env.PORT}`)
}).catch((err) => {
  console.error(`Error on listening to port ${env.PORT}: ${err}`)
});
