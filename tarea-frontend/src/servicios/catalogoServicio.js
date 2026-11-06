import clienteAxios from "./clienteAxios";
import { ENDPOINTS } from "../constantes/api";

export async function listarCatalogo(tipo, filtros = {}) {
  const respuesta = await clienteAxios.get(ENDPOINTS[tipo.toUpperCase()], { params: filtros });
  return respuesta.data.datos;
}

export async function guardarCatalogo(tipo, datos, id) {
  const ruta = ENDPOINTS[tipo.toUpperCase()];
  const respuesta = id
    ? await clienteAxios.put(`${ruta}/${id}`, datos)
    : await clienteAxios.post(ruta, datos);
  return respuesta.data.datos;
}

export async function eliminarCatalogo(tipo, id) {
  await clienteAxios.delete(`${ENDPOINTS[tipo.toUpperCase()]}/${id}`);
}
