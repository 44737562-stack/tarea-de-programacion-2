const fs = require("node:fs");
const path = require("node:path");
const winston = require("winston");

const carpetaLogs = path.resolve(process.cwd(), "logs");
fs.mkdirSync(carpetaLogs, { recursive: true });

const logger = winston.createLogger({
  level: process.env.NIVEL_LOG || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { servicio: "biblioteca-api" },
  transports: [
    new winston.transports.File({
      filename: path.join(carpetaLogs, "aplicacion.log"),
      maxsize: 5_000_000,
      maxFiles: 3,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});

module.exports = logger;
