const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../configuracion/logger");

async function iniciarSesion(solicitud, respuesta, siguiente) {
  try {
    const { correo, clave } = solicitud.body || {};
    if (typeof correo !== "string" || typeof clave !== "string" || !correo.trim() || !clave) {
      return respuesta.status(400).json({ error: { mensaje: "Ingresá el correo y la contraseña." } });
    }
    const administrador = await require("../configuracion/baseDatos")
      .getRepository("Administrador")
      .findOneBy({ correo: correo.trim().toLowerCase() });
    const claveCorrecta = administrador
      ? await bcrypt.compare(clave, administrador.claveEncriptada)
      : false;
    if (!claveCorrecta) {
      logger.warn("Intento de inicio de sesión rechazado", { correo: correo.trim().toLowerCase() });
      return respuesta.status(401).json({ error: { mensaje: "El correo o la contraseña son incorrectos." } });
    }
    const token = jwt.sign(
      { sub: administrador.id, correo: administrador.correo },
      process.env.SECRETO_JWT,
      { expiresIn: process.env.DURACION_TOKEN || "8h" },
    );
    logger.info("Sesión iniciada", { administradorId: administrador.id });
    return respuesta.json({ datos: { token, administrador: { correo: administrador.correo } } });
  } catch (error) {
    return siguiente(error);
  }
}

module.exports = { iniciarSesion };
