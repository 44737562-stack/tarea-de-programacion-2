require("dotenv").config();
const bcrypt = require("bcrypt");
const baseDatos = require("./configuracion/baseDatos");
const logger = require("./configuracion/logger");

async function sembrarAdministrador() {
  const correo = process.env.CORREO_ADMIN;
  const clave = process.env.CLAVE_ADMIN;
  if (!correo || !clave || clave.length < 8) {
    throw new Error("Configurá CORREO_ADMIN y CLAVE_ADMIN (mínimo 8 caracteres) en el archivo .env.");
  }
  await baseDatos.initialize();
  const repositorio = baseDatos.getRepository("Administrador");
  const existente = await repositorio.findOneBy({ correo: correo.trim().toLowerCase() });
  if (existente) {
    logger.info("El administrador ya existe", { correo: existente.correo });
    return;
  }
  const claveEncriptada = await bcrypt.hash(clave, 12);
  await repositorio.save(repositorio.create({
    correo: correo.trim().toLowerCase(),
    claveEncriptada,
  }));
  logger.info("Administrador inicial creado", { correo: correo.trim().toLowerCase() });
}

sembrarAdministrador()
  .catch((error) => {
    logger.error("No se pudo crear el administrador", { mensaje: error.message });
    process.exitCode = 1;
  })
  .finally(async () => {
    if (baseDatos.isInitialized) await baseDatos.destroy();
  });
