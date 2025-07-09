import { FastifyRequest, FastifyReply } from 'fastify';
import { authenticateUser } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export async function loginHandler(
  req: FastifyRequest<{ Body: { username: string; password: string } }>,
  res: FastifyReply
) {
  try {
    console.log('Login request received');
    const result = await authenticateUser(req.body);
    res.status(200).send(result);
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).send({ error: err.message });
    } else {
      console.error('Unexpected error during login:', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}