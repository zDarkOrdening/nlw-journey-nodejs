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

const PORT = 3333
const fastify = Fastify()

fastify.register(cors, {
  origin: '*'
})

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

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

fastify.listen({ port: PORT }).then(() => {
  console.log(`Server listening on port ${PORT}`)
}).catch((err) => {
  console.error(`Error on listening to port ${PORT}: ${err}`)
});
