const fastify = require('fastify');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

function searchEngine() {
  // TODO
}

dotenv.config();
// initialized Fastify App
const app = fastify();

const mongoURI = process.env.CONNECT_DB;

// connected fastify to mongoose
try {
  mongoose.connect(mongoURI);
  console.log('DB Connected...');
} catch (e) {
  console.error(e);
}

app.get('/', (request, reply) => {
  try {
    reply.send('Welcome to the search');
  } catch (e) {
    console.error(e);
  }
});

app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});

module.exports = searchEngine;
