const logger = require("../configuracion/logger");

function manejarErrores(error, solicitud, respuesta, siguiente) {
  if (respuesta.headersSent) return siguiente(error);
  let estado = error.estado || error.status || 500;
  if (estado < 400 || estado > 599) estado = 500;
  let mensaje = estado === 500 ? "Ocurrió un error interno. Intentá nuevamente." : error.message;
  if (estado === 400 && error.type === "entity.parse.failed") {
    mensaje = "El cuerpo de la solicitud no contiene JSON válido.";
  }
  if (error.code === "SQLITE_CONSTRAINT" || error.code === "SQLITE_CONSTRAINT_UNIQUE") {
    estado = 409;
    mensaje = "Ya existe un registro con ese valor único o está relacionado con otros datos.";
  }
  logger.log(estado >= 500 ? "error" : "warn", error.message, {
    metodo: solicitud.method,
    ruta: solicitud.originalUrl,
    estado,
    ...(estado >= 500 ? { stack: error.stack } : {}),
  });
  return respuesta.status(estado).json({ error: { mensaje } });
}

module.exports = manejarErrores;
