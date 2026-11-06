const express = require("express");
const autenticar = require("../middlewares/autenticacion");
const { RUTAS_API } = require("../configuracion/constantes");
const { iniciarSesion } = require("../controladores/controladorAutenticacion");
const { crearControlador, validarId } = require("../controladores/controladorCatalogo");
const servicioLibros = require("../servicios/servicioLibros");
const { ErrorNoEncontrado } = require("../servicios/servicioCatalogo");
const rutasCatalogos = require("./catalogos");
const logger = require("../configuracion/logger");
const fs = require("node:fs/promises");
const path = require("node:path");

const rutas = express.Router();
rutas.post(`${RUTAS_API.AUTENTICACION}/login`, iniciarSesion);
rutas.use(autenticar);

const controladorLibros = crearControlador(servicioLibros, "Libro");
rutas.get(RUTAS_API.LIBROS, controladorLibros.listar);
rutas.post(RUTAS_API.LIBROS, controladorLibros.crear);
rutas.get(`${RUTAS_API.LIBROS}/:id`, validarId, controladorLibros.obtener);
rutas.put(`${RUTAS_API.LIBROS}/:id`, validarId, controladorLibros.actualizar);
rutas.delete(`${RUTAS_API.LIBROS}/:id`, validarId, controladorLibros.eliminar);
rutas.use("/api", rutasCatalogos);

rutas.get(RUTAS_API.EVENTOS, async (solicitud, respuesta, siguiente) => {
  try {
    const rutaLogs = path.resolve(process.cwd(), "logs", "aplicacion.log");
    let contenido;
    try {
      contenido = await fs.readFile(rutaLogs, "utf8");
    } catch (error) {
      if (error.code === "ENOENT") return respuesta.json({ datos: [] });
      throw error;
    }
    const cantidad = Math.min(Math.max(Number(solicitud.query.limite) || 100, 1), 500);
    const eventos = contenido.split("\n").filter(Boolean).slice(-cantidad).reverse()
      .map((linea) => {
        try {
          return JSON.parse(linea);
        } catch (error) {
          logger.warn("Se omitió una línea de log mal formada");
          return null;
        }
      })
      .filter(Boolean);
    return respuesta.json({ datos: eventos });
  } catch (error) {
    return siguiente(error);
  }
});

rutas.use((solicitud, respuesta, siguiente) => {
  siguiente(new ErrorNoEncontrado(`La ruta ${solicitud.method} ${solicitud.path} no existe.`));
});

module.exports = rutas;
