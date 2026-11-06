import clienteAxios from "./clienteAxios";
import { ENDPOINTS } from "../constantes/api";

export async function listarEventos() {
  const respuesta = await clienteAxios.get(ENDPOINTS.EVENTOS);
  return respuesta.data.datos;
}
