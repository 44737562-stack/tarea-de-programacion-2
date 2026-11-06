require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rutas = require("./rutas");
const registrarSolicitud = require("./middlewares/logSolicitudes");
const manejarErrores = require("./middlewares/manejoErrores");

const aplicacion = express();
aplicacion.use(cors({ origin: process.env.ORIGEN_FRONTEND || "http://localhost:5173" }));
aplicacion.use(express.json({ limit: "1mb" }));
aplicacion.use(registrarSolicitud);
aplicacion.get("/api/salud", (solicitud, respuesta) => {
  respuesta.json({ datos: { estado: "ok" } });
});
aplicacion.use(rutas);
aplicacion.use(manejarErrores);

module.exports = aplicacion;
