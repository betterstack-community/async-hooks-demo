import Fastify from "fastify";

const fastify = Fastify({ logger: true, disableRequestLogging: true });
const logger = fastify.log;
const users = new Map(); // Simple in-memory storage for user data

fastify.get("/register", (request, reply) => {
  const userName = request.query.username; // Get username from query parameter
  logger.info("Received registration request");
  reply.send(registerUser(userName));
});

function registerUser(userName) {
  logger.info("Registering user");
  if (validateInput(userName)) {
    return saveUserData(userName);
  } else {
    logger.warn("Invalid input for username");
    return { error: "Invalid input for username" };
  }
}

function validateInput(userName) {
  const isValid = typeof userName === "string" && userName.trim() !== "";
  logger.info({ isValid }, "Validating input");
  return isValid;
}

function saveUserData(userName) {
  users.set(userName, { userName });
  logger.info("User data saved");
  return sendConfirmation();
}

function sendConfirmation() {
  logger.info("Sending confirmation");
  return { message: "User registered successfully! Confirmation sent." };
}

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is listening on ${address}`);
});
