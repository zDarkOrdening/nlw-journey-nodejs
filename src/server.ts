import Fastify from "fastify";

const PORT = 3000
const fastify = Fastify()

fastify.get("/", () => {
  return "Hello, World!"
})


fastify.listen({ port: PORT }).then(() => {
  console.log(`Server listening on port ${PORT}`)
}).catch((err) => {
  console.error(`Error on listening to port ${PORT}: ${err}`)
});
