const winston = require("winston");
const LokiTransport = require("winston-loki");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new LokiTransport({
      host: process.env.LOKI_URL || "http://loki:3100",
      labels: { app: "express-api", env: "dev" },
      json: true,
      format: winston.format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => console.error("Loki connection error:", err),
    }),
  ],
});

module.exports = logger;
