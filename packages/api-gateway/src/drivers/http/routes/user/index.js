const { userAdapter } = require('../../adapters');
const { createUserSchema } = require('./schema');

async function UserRouter(fastify) {
  await fastify.post('/', { schema: createUserSchema }, userAdapter.createUser);
  await fastify.post("/:userId/validate", { validateUserSchema }, userAdapter.validateUser);
}

module.exports = {UserRouter};
