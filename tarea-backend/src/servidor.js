require("dotenv").config();
const aplicacion = require("./aplicacion");
const baseDatos = require("./configuracion/baseDatos");
const logger = require("./configuracion/logger");

async function iniciarServidor() {
  if (!process.env.SECRETO_JWT) {
    throw new Error("Falta configurar la variable SECRETO_JWT.");
  }
  await baseDatos.initialize();
  const puerto = Number(process.env.PUERTO) || 3000;
  aplicacion.listen(puerto, () => {
    logger.info("Servidor iniciado", { puerto });
  });
}

iniciarServidor().catch((error) => {
  logger.error("No se pudo iniciar el servidor", { mensaje: error.message, stack: error.stack });
  process.exitCode = 1;
});
