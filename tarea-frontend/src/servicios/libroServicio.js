import clienteAxios from "./clienteAxios";
import { ENDPOINTS } from "../constantes/api";

export async function listarLibros(filtros = {}) {
  const respuesta = await clienteAxios.get(ENDPOINTS.LIBROS, { params: filtros });
  return respuesta.data.datos;
}

export async function obtenerLibro(id) {
  const respuesta = await clienteAxios.get(`${ENDPOINTS.LIBROS}/${id}`);
  return respuesta.data.datos;
}

export async function guardarLibro(datos, id) {
  const respuesta = id
    ? await clienteAxios.put(`${ENDPOINTS.LIBROS}/${id}`, datos)
    : await clienteAxios.post(ENDPOINTS.LIBROS, datos);
  return respuesta.data.datos;
}

export async function eliminarLibro(id) {
  await clienteAxios.delete(`${ENDPOINTS.LIBROS}/${id}`);
}
