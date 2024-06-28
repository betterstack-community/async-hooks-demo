import Fastify from "fastify";

const fastify = Fastify({ logger: true });
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
    return "Invalid input for username";
  }
}

function validateInput(userName) {
  const isValid = typeof userName === "string" && userName.trim() !== "";
  logger.info(`Validating input. IsValid: ${isValid}`);
  return isValid;
}

function saveUserData(userName) {
  users.set(userName, { userName });
  logger.info("User data saved");
  return sendConfirmation();
}

function sendConfirmation() {
  logger.info("Sending confirmation");
  return "User registered successfully! Confirmation sent.";
}

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Server is listening on ${address}`);
});
