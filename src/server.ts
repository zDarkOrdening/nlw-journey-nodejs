import Fastify from "fastify";
import cors from "@fastify/cors"
import { createTrip } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";

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

fastify.listen({ port: PORT }).then(() => {
  console.log(`Server listening on port ${PORT}`)
}).catch((err) => {
  console.error(`Error on listening to port ${PORT}: ${err}`)
});
