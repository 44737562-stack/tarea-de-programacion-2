const logger = require("../configuracion/logger");

function registrarSolicitud(solicitud, respuesta, siguiente) {
  const inicio = Date.now();
  respuesta.on("finish", () => {
    const tiempoMs = Date.now() - inicio;
    logger.info("Solicitud HTTP", {
      metodo: solicitud.method,
      ruta: solicitud.originalUrl,
      estado: respuesta.statusCode,
      tiempoMs,
    });
  });
  siguiente();
}

module.exports = registrarSolicitud;
