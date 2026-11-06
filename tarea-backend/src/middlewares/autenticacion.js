const jwt = require("jsonwebtoken");

function autenticar(solicitud, respuesta, siguiente) {
  const encabezado = solicitud.headers.authorization;
  const token = encabezado && encabezado.startsWith("Bearer ")
    ? encabezado.slice(7)
    : null;
  if (!token) {
    return respuesta.status(401).json({ error: { mensaje: "Necesitás iniciar sesión para continuar." } });
  }
  try {
    solicitud.administrador = jwt.verify(token, process.env.SECRETO_JWT);
    return siguiente();
  } catch (error) {
    const mensaje = error.name === "TokenExpiredError"
      ? "La sesión expiró. Iniciá sesión nuevamente."
      : "La sesión no es válida. Iniciá sesión nuevamente.";
    return respuesta.status(401).json({ error: { mensaje } });
  }
}

module.exports = autenticar;
