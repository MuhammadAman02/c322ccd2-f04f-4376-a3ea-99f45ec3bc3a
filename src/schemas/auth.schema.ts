import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Define Zod schemas
const loginZod = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const loginResponseZod = z.object({
  message: z.string(),
  token: z.string(),
});

const errorResponseZod = z.object({
  error: z.string(),
});

// Export Fastify-compatible JSON schemas
export const loginSchema = {
  body: zodToJsonSchema(loginZod),
  response: {
    200: zodToJsonSchema(loginResponseZod),
    401: zodToJsonSchema(errorResponseZod),
  },
};