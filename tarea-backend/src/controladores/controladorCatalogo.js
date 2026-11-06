const logger = require("../configuracion/logger");
const { ErrorValidacion } = require("../servicios/servicioCatalogo");

function crearControlador(servicio, recurso) {
  return {
    listar: async (solicitud, respuesta, siguiente) => {
      try {
        const datos = await servicio.listar(solicitud.query);
        respuesta.json({ datos });
      } catch (error) {
        siguiente(error);
      }
    },
    obtener: async (solicitud, respuesta, siguiente) => {
      try {
        respuesta.json({ datos: await servicio.obtener(solicitud.params.id) });
      } catch (error) {
        siguiente(error);
      }
    },
    crear: async (solicitud, respuesta, siguiente) => {
      try {
        const datos = await servicio.crear(solicitud.body);
        logger.info("Registro creado", { recurso, id: datos.id });
        respuesta.status(201).json({ datos, mensaje: `${recurso} creado correctamente.` });
      } catch (error) {
        siguiente(error);
      }
    },
    actualizar: async (solicitud, respuesta, siguiente) => {
      try {
        const datos = await servicio.actualizar(solicitud.params.id, solicitud.body);
        logger.info("Registro actualizado", { recurso, id: datos.id });
        respuesta.json({ datos, mensaje: `${recurso} actualizado correctamente.` });
      } catch (error) {
        siguiente(error);
      }
    },
    eliminar: async (solicitud, respuesta, siguiente) => {
      try {
        await servicio.eliminar(solicitud.params.id);
        logger.info("Registro eliminado", { recurso, id: Number(solicitud.params.id) });
        respuesta.json({ datos: null, mensaje: `${recurso} eliminado correctamente.` });
      } catch (error) {
        siguiente(error);
      }
    },
  };
}

function validarId(solicitud, respuesta, siguiente) {
  const id = Number(solicitud.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return siguiente(new ErrorValidacion("El identificador debe ser un número entero positivo."));
  }
  return siguiente();
}

module.exports = { crearControlador, validarId };
