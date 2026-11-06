const express = require("express");
const { crearControlador, validarId } = require("../controladores/controladorCatalogo");
const { ServicioCatalogo } = require("../servicios/servicioCatalogo");

const definiciones = [
  { ruta: "/autores", entidad: "Autor", recurso: "Autor", requeridos: ["nombre", "apellido"] },
  { ruta: "/generos", entidad: "Genero", recurso: "Género", requeridos: ["nombre"] },
  { ruta: "/sagas", entidad: "Saga", recurso: "Saga", requeridos: ["nombre"], opcionales: ["descripcion"] },
  { ruta: "/estantes", entidad: "Estante", recurso: "Estante", requeridos: ["codigo", "ubicacion"] },
];

const rutasCatalogos = express.Router();
for (const definicion of definiciones) {
  const servicio = new ServicioCatalogo(
    definicion.entidad,
    definicion.requeridos,
    definicion.opcionales || [],
  );
  const controlador = crearControlador(servicio, definicion.recurso);
  const rutas = express.Router();
  rutas.get("/", controlador.listar);
  rutas.post("/", controlador.crear);
  rutas.get("/:id", validarId, controlador.obtener);
  rutas.put("/:id", validarId, controlador.actualizar);
  rutas.delete("/:id", validarId, controlador.eliminar);
  rutasCatalogos.use(definicion.ruta, rutas);
}

module.exports = rutasCatalogos;
