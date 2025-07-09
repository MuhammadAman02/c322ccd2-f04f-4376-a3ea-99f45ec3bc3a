import Fastify from "fastify";
import root from "./routes/root";

const app = Fastify({
  logger: true,
});

// Register routes
app.register(root, { prefix: "/" });

// Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(500).send({ error: "Internal Server Error" });
});

export default app;
